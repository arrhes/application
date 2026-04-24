import { models, updateTokensSubscriptionRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { getTokenAddonQuantity, getTotalTokensFromQuantity } from "../../../../utilities/billing/subscriptionPricing.js"
import { recordOrganizationPayment } from "../../../../utilities/billing/wallet.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"

const TOKEN_PACK_PRICE_IN_CENTS = 100

export const updateTokensSubscriptionRoute = apiFactory
    .createApp()
    .post(updateTokensSubscriptionRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateTokensSubscriptionRouteDefinition.schemas.body,
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
        const currentQuantity = getTokenAddonQuantity(organization.tokensTotalLeft + organization.tokensTotalUsed)

        if (body.newQuantity < currentQuantity) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Cannot reduce token packs",
                externalMessage: "La réduction d'un solde ponctuel déjà acheté n'est pas prise en charge.",
            })
        }

        const currentAmountInCents = currentQuantity * TOKEN_PACK_PRICE_IN_CENTS
        const nextAmountInCents = body.newQuantity * TOKEN_PACK_PRICE_IN_CENTS
        const differenceInCents = currentAmountInCents - nextAmountInCents
        const paidAmountInCents = Math.abs(differenceInCents)
        const newWalletBalanceInCents = organization.walletBalanceInCents + differenceInCents

        if (newWalletBalanceInCents < 0) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Not enough balance in wallet to increase token amount",
                externalMessage: "Le solde du portefeuille de l'organisation est insuffisant pour acheter ces tokens.",
            })
        }

        const nextTokensTotal = getTotalTokensFromQuantity(body.newQuantity)
        if (nextTokensTotal < organization.tokensTotalUsed) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Requested token total is below used tokens",
                externalMessage: "La quantité demandée est inférieure aux tokens déjà consommés.",
            })
        }

        await c.var.clients.sql.transaction(async (transaction) => {
            await updateOne({
                database: transaction,
                table: models.organization,
                data: {
                    agentTokensMonthlyLimit: nextTokensTotal,
                    tokensTotalLeft: Math.max(nextTokensTotal - organization.tokensTotalUsed, 0),
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
                    description: "Achat tokens Assistant IA",
                    serviceType: "agent_tokens_million",
                    createdBy: user.id,
                })
            }
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateTokensSubscriptionRouteDefinition.schemas.return,
            data: {},
        })
    })
