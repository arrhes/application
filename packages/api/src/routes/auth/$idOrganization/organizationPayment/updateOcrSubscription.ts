import { models, updateOcrSubscriptionRouteDefinition } from "@arrhes/application-metadata"
import { OCR_PAGE_PRICE_IN_CENTS } from "@arrhes/application-metadata/utilities"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { findOrCreateCurrentPeriodInvoice, getCurrentMonthRange } from "../../../../utilities/billing/billingInvoice.js"
import { INCLUDED_OCR_PAGES } from "../../../../utilities/billing/subscriptionPricing.js"
import { recordOrganizationPayment } from "../../../../utilities/billing/wallet.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"

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
        // body.newQuantity = total addon pages above included quota (individual pages, not packs)
        const totalOcrPages = organization.ocrPagesTotalLeft + organization.ocrPagesTotalUsed
        const currentAddonPages = Math.max(totalOcrPages - INCLUDED_OCR_PAGES, 0)

        if (body.newQuantity < currentAddonPages) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Cannot reduce OCR pages",
                externalMessage: "La réduction d'un solde ponctuel déjà acheté n'est pas prise en charge.",
            })
        }

        const deltaPages = body.newQuantity - currentAddonPages
        const paidAmountInCents = deltaPages * OCR_PAGE_PRICE_IN_CENTS
        const newWalletBalanceInCents = organization.walletBalanceInCents - paidAmountInCents

        if (newWalletBalanceInCents < 0) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Not enough balance in wallet to purchase OCR pages",
                externalMessage:
                    "Le solde du portefeuille de l'organisation est insuffisant pour acheter ces pages OCR.",
            })
        }

        const nextOcrTotal = INCLUDED_OCR_PAGES + body.newQuantity
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
                const { periodStart, periodEnd } = getCurrentMonthRange(now)
                const idInvoice = await findOrCreateCurrentPeriodInvoice({
                    database: transaction,
                    idOrganization,
                    periodStart,
                    periodEnd,
                    now,
                })
                await recordOrganizationPayment({
                    database: transaction,
                    idOrganization,
                    category: "wallet_spending",
                    status: "paid",
                    amountInCents: paidAmountInCents,
                    description: "Achat pages OCR",
                    serviceType: "ocr_pages_hundred",
                    idInvoice,
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
