import { models, readAllOrganizationBillingsRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import {
    getSubscriptionMonthlyAmountInCents,
    isResourceSubscriptionType,
} from "../../../../../../utilities/billing/subscriptionPricing.js"
import { response } from "../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const readAllOrganizationBillingsRoute = apiFactory
    .createApp()
    .get(readAllOrganizationBillingsRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        const _body = await validateBodyMiddleware({
            context: c,
            schema: readAllOrganizationBillingsRouteDefinition.schemas.body,
        })

        await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idUser, auth.user.id), eq(table.idOrganization, idOrganization)),
        })

        const subscriptions = await selectMany({
            database: c.var.clients.sql,
            table: models.organizationBilling,
            where: (table) => eq(table.idOrganization, idOrganization),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readAllOrganizationBillingsRouteDefinition.schemas.return,
            data: subscriptions.map((subscription) => ({
                ...subscription,
                amountInCents:
                    subscription.status === "active" && isResourceSubscriptionType(subscription.type)
                        ? getSubscriptionMonthlyAmountInCents(subscription)
                        : subscription.amountInCents,
            })),
        })
    })
