import { cancelSubscriptionRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { response } from "../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../utilities/sql/selectMany.js"

export const cancelSubscriptionRoute = apiFactory
    .createApp()
    .post(cancelSubscriptionRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        await validateBodyMiddleware({
            context: c,
            schema: cancelSubscriptionRouteDefinition.schemas.body,
        })

        const activeSubscriptions = await selectMany({
            database: c.var.clients.sql,
            table: models.organizationBilling,
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.status, "active")),
        })

        if (activeSubscriptions.length === 0) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "No active subscription to cancel",
                externalMessage: "Aucun abonnement actif à résilier",
            })
        }

        return response({
            context: c,
            statusCode: 200,
            schema: cancelSubscriptionRouteDefinition.schemas.return,
            data: {},
        })
    })
