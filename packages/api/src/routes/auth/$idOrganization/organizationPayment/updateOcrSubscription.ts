import { models, updateOcrSubscriptionRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { getOcrAddonQuantity, getTotalOcrPagesFromQuantity } from "../../../../utilities/billing/subscriptionPricing.js"
import { recordOrganizationPayment } from "../../../../utilities/billing/wallet.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"

const OCR_PACK_PRICE_IN_CENTS = 100

export const updateOcrSubscriptionRoute = apiFactory
    .createApp()
    .post(updateOcrSubscriptionRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateOcrSubscriptionRouteDefinition.schemas.body,
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

        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })

        const now = new Date()
        const currentQuantity = getOcrAddonQuantity(organization.ocrPagesTotalLeft + organization.ocrPagesTotalUsed)

        if (body.newQuantity < currentQuantity) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Cannot reduce OCR packs",
                externalMessage: "La réduction d'un solde ponctuel déjà acheté n'est pas prise en charge.",
            })
        }

        const currentAmountInCents = currentQuantity * OCR_PACK_PRICE_IN_CENTS
        const nextAmountInCents = body.newQuantity * OCR_PACK_PRICE_IN_CENTS
        const differenceInCents = currentAmountInCents - nextAmountInCents
        const paidAmountInCents = Math.abs(differenceInCents)
        const newWalletBalanceInCents = organization.walletBalanceInCents + differenceInCents

        if (newWalletBalanceInCents < 0) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Not enough balance in wallet to increase OCR amount",
                externalMessage:
                    "Le solde du portefeuille de l'organisation est insuffisant pour acheter ces pages OCR.",
            })
        }

        const nextOcrTotal = getTotalOcrPagesFromQuantity(body.newQuantity)
        if (nextOcrTotal < organization.ocrPagesTotalUsed) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Requested OCR total is below used pages",
                externalMessage: "La quantité demandée est inférieure aux pages OCR déjà consommées.",
            })
        }

        await c.var.clients.sql.transaction(async (transaction) => {
            await updateOne({
                database: transaction,
                table: models.organization,
                data: {
                    ocrMonthlyLimit: nextOcrTotal,
                    ocrPagesTotalLeft: Math.max(nextOcrTotal - organization.ocrPagesTotalUsed, 0),
                    walletBalanceInCents: newWalletBalanceInCents,
                    lastUpdatedAt: now.toISOString(),
                    lastUpdatedBy: user.id,
                },
                where: (table) => eq(table.id, idOrganization),
            })

            if (paidAmountInCents > 0) {
                await recordOrganizationPayment({
                    database: transaction,
                    idOrganization,
                    category: "wallet_spending",
                    status: "paid",
                    amountInCents: paidAmountInCents,
                    description: "Achat pages OCR",
                    serviceType: "ocr_pages_hundred",
                    createdBy: user.id,
                })
            }
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateOcrSubscriptionRouteDefinition.schemas.return,
            data: {},
        })
    })
