import { models, readAllOrganizationSubscriptionsRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import {
    getSubscriptionMonthlyAmountInCents,
    isResourceSubscriptionType,
} from "../../../../utilities/billing/subscriptionPricing.js"
import { response } from "../../../../utilities/response.js"
import { selectMany } from "../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"

export const readAllOrganizationSubscriptionsRoute = apiFactory
    .createApp()
    .post(readAllOrganizationSubscriptionsRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const _body = await validateBodyMiddleware({
            context: c,
            schema: readAllOrganizationSubscriptionsRouteDefinition.schemas.body,
        })

        await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idUser, user.id), eq(table.idOrganization, idOrganization)),
        })

        const subscriptions = await selectMany({
            database: c.var.clients.sql,
            table: models.organizationSubscription,
            where: (table) => eq(table.idOrganization, idOrganization),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readAllOrganizationSubscriptionsRouteDefinition.schemas.return,
            data: subscriptions.map((subscription) => ({
                ...subscription,
                amountInCents:
                    subscription.status === "active" && isResourceSubscriptionType(subscription.type)
                        ? getSubscriptionMonthlyAmountInCents(subscription)
                        : subscription.amountInCents,
            })),
        })
    })
