import { models, updateStorageSubscriptionRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { FREE_STORAGE_BYTES, getStorageAddonQuantity } from "../../../../utilities/billing/subscriptionPricing.js"
import { recordOrganizationPayment } from "../../../../utilities/billing/wallet.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"

const STORAGE_PRICE_PER_GB_IN_CENTS = 10

export const updateStorageSubscriptionRoute = apiFactory
    .createApp()
    .post(updateStorageSubscriptionRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateStorageSubscriptionRouteDefinition.schemas.body,
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

        const minimumStorageQuantityFromUsage = Math.max(
            Math.ceil(organization.storageCurrentUsage / FREE_STORAGE_BYTES) - 1,
            0,
        )

        if (body.newQuantity < minimumStorageQuantityFromUsage) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Requested storage is below current usage",
                externalMessage: "Le stockage sélectionné ne peut pas être inférieur à l'usage actuel.",
            })
        }

        const now = new Date()
        const currentQuantity = getStorageAddonQuantity(organization.storageMaxUsage)
        const currentAmountInCents = currentQuantity * STORAGE_PRICE_PER_GB_IN_CENTS
        const nextAmountInCents = body.newQuantity * STORAGE_PRICE_PER_GB_IN_CENTS
        const differenceInCents = currentAmountInCents - nextAmountInCents
        const paidAmountInCents = Math.abs(differenceInCents)
        const newWalletBalanceInCents = organization.walletBalanceInCents + differenceInCents

        if (newWalletBalanceInCents < 0) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Not enough balance in wallet to increase storage amount",
                externalMessage:
                    "Le solde du portefeuille de l'organisation est insuffisant pour augmenter le stockage de ce montant.",
            })
        }

        const nextStorageMaxUsage = FREE_STORAGE_BYTES + body.newQuantity * FREE_STORAGE_BYTES

        await c.var.clients.sql.transaction(async (transaction) => {
            await updateOne({
                database: transaction,
                table: models.organization,
                data: {
                    storageLimit: nextStorageMaxUsage,
                    storageMaxUsage: nextStorageMaxUsage,
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
                    category: differenceInCents < 0 ? "wallet_spending" : "top_up",
                    status: "paid",
                    amountInCents: paidAmountInCents,
                    description:
                        differenceInCents < 0
                            ? "Augmentation du stockage"
                            : "Réduction du stockage créditée au portefeuille",
                    serviceType: "storage_gb",
                    createdBy: user.id,
                })
            }
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateStorageSubscriptionRouteDefinition.schemas.return,
            data: {},
        })
    })
