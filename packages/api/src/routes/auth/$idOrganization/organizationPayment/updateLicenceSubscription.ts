import { models, updateLicenceSubscriptionRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"

export const updateLicenceSubscriptionRoute = apiFactory
    .createApp()
    .post(updateLicenceSubscriptionRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateLicenceSubscriptionRouteDefinition.schemas.body,
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
        const now = new Date()

        if (Number.isNaN(body.newAmountInCents) || body.newAmountInCents < 0) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Invalid amount",
                externalMessage: "Montant invalide",
            })
        }

        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })
        const differenceInCents = organization.licenceAmount - body.newAmountInCents
        const newWalletBalanceInCents = organization.walletBalanceInCents + differenceInCents
        if (newWalletBalanceInCents < 0) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Not enough balance in wallet to increase licence amount",
                externalMessage: "Le solde du portefeuille de l'organisation est insuffisant pour augmenter le montant de la licence de ce montant.",
            })
        }

        await updateOne({
            database: c.var.clients.sql,
            table: models.organization,
            data: {
                licenceAmount: body.newAmountInCents,
                walletBalanceInCents: newWalletBalanceInCents,
                lastUpdatedAt: now.toISOString(),
                lastUpdatedBy: user.id,
            },
            where: (table) => eq(table.id, idOrganization),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateLicenceSubscriptionRouteDefinition.schemas.return,
            data: { checkoutUrl: null },
        })
    })
