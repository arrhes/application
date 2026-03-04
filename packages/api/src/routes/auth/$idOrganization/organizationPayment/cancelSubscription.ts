import { cancelSubscriptionRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"

export const cancelSubscriptionRoute = apiFactory
    .createApp()
    .post(cancelSubscriptionRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const _body = await validateBodyMiddleware({
            context: c,
            schema: cancelSubscriptionRouteDefinition.schemas.body,
        })

        // Verify user is admin of the organization
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

        // Get the organization
        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })

        if (organization.mollieCustomerId === null || organization.mollieSubscriptionId === null) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "No active subscription to cancel",
                externalMessage: "Aucun abonnement actif à annuler",
            })
        }

        // Cancel the subscription on Mollie (stops future charges)
        await c.var.clients.mollie.customerSubscriptions.cancel(organization.mollieSubscriptionId, {
            customerId: organization.mollieCustomerId,
        })

        // Remove the Mollie subscription ID but keep subcriptionEndingAt intact.
        // The user retains premium access until the end of their current paid period.
        // The checkOrganizationSubscriptionSessionMiddleware already checks that
        // subcriptionEndingAt is in the future, so access will expire naturally.
        await updateOne({
            database: c.var.clients.sql,
            table: models.organization,
            data: {
                mollieSubscriptionId: null,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: user.id,
            },
            where: (table) => eq(table.id, organization.id),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: cancelSubscriptionRouteDefinition.schemas.return,
            data: {},
        })
    })
