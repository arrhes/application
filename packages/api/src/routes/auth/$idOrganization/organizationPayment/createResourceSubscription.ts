import { createResourceSubscriptionRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import {
    FREE_STORAGE_BYTES,
    getOcrAddonQuantity,
    getResourceSubscriptionMinimumQuantity,
    getResourceSubscriptionUnitPriceInCents,
    getStorageAddonQuantity,
    getTokenAddonQuantity,
    getTotalOcrPagesFromQuantity,
    getTotalTokensFromQuantity,
    INCLUDED_OCR_PAGES,
    isOneTimeServiceType,
} from "../../../../utilities/billing/subscriptionPricing.js"
import { creditOrganizationWallet, debitOrganizationWallet } from "../../../../utilities/billing/wallet.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"

export const createResourceSubscriptionRoute = apiFactory
    .createApp()
    .post(createResourceSubscriptionRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createResourceSubscriptionRouteDefinition.schemas.body,
        })

        const organizationUser = await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idUser, user.id), eq(table.idOrganization, idOrganization)),
        })
        if (organizationUser.isAdmin === false) {
            throw new Exception({
                statusCode: 401,
                internalMessage: "User is not admin of the organization",
                externalMessage: "Vous n'êtes pas administrateur de l'organisation",
            })
        }

        if (body.quantity > 0 && body.quantity < getResourceSubscriptionMinimumQuantity(body.type)) {
            throw new Exception({
                statusCode: 400,
                internalMessage: `Resource quantity below minimum for ${body.type}`,
                externalMessage:
                    body.type === "storage_gb"
                        ? "Le stockage supplémentaire doit être d'au moins 1 Go."
                        : "La quantité minimale pour ce service est de 1.",
            })
        }

        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })

        const currentQuantity =
            body.type === "storage_gb"
                ? getStorageAddonQuantity(organization.storageLimit)
                : body.type === "agent_tokens_million"
                    ? getTokenAddonQuantity(organization.tokensTotalAvailable + organization.tokensTotalUsed)
                    : getOcrAddonQuantity(organization.ocrPagesTotalAvailable + organization.ocrPagesTotalUsed)

        if (body.type === "storage_gb") {
            const minimumStorageQuantityFromUsage = Math.max(
                Math.ceil(organization.storageCurrentUsage / FREE_STORAGE_BYTES) - 1,
                0,
            )

            if (body.quantity < minimumStorageQuantityFromUsage) {
                throw new Exception({
                    statusCode: 400,
                    internalMessage: "Requested storage is below current usage",
                    externalMessage: "Le stockage sélectionné ne peut pas être inférieur à l'usage actuel.",
                })
            }
        }

        const deltaQuantity = body.quantity - currentQuantity
        const isOneTimeService = isOneTimeServiceType(body.type)

        if (isOneTimeService && deltaQuantity < 0) {
            throw new Exception({
                statusCode: 400,
                internalMessage: `Cannot reduce one-time balance for ${body.type}`,
                externalMessage: "La réduction d'un solde ponctuel déjà acheté n'est pas prise en charge.",
            })
        }

        if (deltaQuantity === 0) {
            return response({
                context: c,
                statusCode: 200,
                schema: createResourceSubscriptionRouteDefinition.schemas.return,
                data: { checkoutUrl: null },
            })
        }

        const now = new Date()

        const nextStorageLimit =
            body.type === "storage_gb" ? FREE_STORAGE_BYTES + body.quantity * FREE_STORAGE_BYTES : undefined
        const nextTokensTotal =
            body.type === "agent_tokens_million" ? getTotalTokensFromQuantity(body.quantity) : undefined
        const nextOcrTotal = body.type === "ocr_pages_hundred" ? getTotalOcrPagesFromQuantity(body.quantity) : undefined

        if (nextTokensTotal !== undefined && nextTokensTotal < organization.tokensTotalUsed) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Requested token total is below used tokens",
                externalMessage: "La quantité demandée est inférieure aux tokens déjà consommés.",
            })
        }

        if (nextOcrTotal !== undefined && nextOcrTotal < organization.ocrPagesTotalUsed) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Requested OCR total is below used pages",
                externalMessage: "La quantité demandée est inférieure aux pages OCR déjà consommées.",
            })
        }

        const deltaAmountInCents =
            body.type === "ocr_pages_hundred"
                ? getResourceSubscriptionUnitPriceInCents(body.type) * Math.abs(deltaQuantity) * INCLUDED_OCR_PAGES
                : getResourceSubscriptionUnitPriceInCents(body.type) * Math.abs(deltaQuantity)

        if (deltaQuantity > 0) {
            await debitOrganizationWallet({
                database: c.var.clients.sql,
                idOrganization,
                idUser: user.id,
                amountHTInCents: deltaAmountInCents,
                quantity: body.type === "ocr_pages_hundred" ? deltaQuantity * INCLUDED_OCR_PAGES : deltaQuantity,
                unitAmountHTInCents: getResourceSubscriptionUnitPriceInCents(body.type),
                serviceType: body.type,
                description:
                    body.type === "storage_gb"
                        ? "Augmentation du stockage"
                        : body.type === "agent_tokens_million"
                            ? "Achat tokens Assistant IA"
                            : "Achat pages OCR",
            })
        }

        if (body.type === "storage_gb" && deltaQuantity < 0) {
            await creditOrganizationWallet({
                database: c.var.clients.sql,
                idOrganization,
                idUser: user.id,
                amountHTInCents: deltaAmountInCents,
                serviceType: body.type,
                description: "Réduction du stockage créditée au portefeuille",
            })
        }

        await updateOne({
            database: c.var.clients.sql,
            table: models.organization,
            data: {
                storageLimit: nextStorageLimit,
                ocrPagesTotalAvailable:
                    nextOcrTotal !== undefined ? Math.max(nextOcrTotal - organization.ocrPagesTotalUsed, 0) : undefined,
                tokensTotalAvailable:
                    nextTokensTotal !== undefined
                        ? Math.max(nextTokensTotal - organization.tokensTotalUsed, 0)
                        : undefined,
                lastUpdatedAt: now.toISOString(),
                lastUpdatedBy: user.id,
            },
            where: (table) => eq(table.id, idOrganization),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: createResourceSubscriptionRouteDefinition.schemas.return,
            data: { checkoutUrl: null },
        })
    })
