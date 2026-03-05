import { models, readOrganizationSubscriptionRouteDefinition } from "@arrhes/application-metadata"
import { and, desc, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { selectMany } from "../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"

export const readOrganizationSubscriptionRoute = apiFactory
    .createApp()
    .post(readOrganizationSubscriptionRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const _body = await validateBodyMiddleware({
            context: c,
            schema: readOrganizationSubscriptionRouteDefinition.schemas.body,
        })

        // Verify user is member of the organization
        await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idUser, user.id), eq(table.idOrganization, idOrganization)),
        })

        // Get organization
        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })

        // Get latest payment status
        const payments = await selectMany({
            database: c.var.clients.sql,
            table: models.organizationPayment,
            where: (table) => eq(table.idOrganization, idOrganization),
            orderBy: (table) => desc(table.createdAt),
        })

        const latestPayment = payments.at(0)

        // isPremium = subcriptionEndingAt is set AND is in the future
        const isPremium =
            organization.subcriptionEndingAt !== null && new Date(organization.subcriptionEndingAt) > new Date()

        // Derive subscription status:
        // - "active": has an active Mollie subscription and valid premium access
        // - "cancelled": subscription was cancelled but paid period hasn't expired yet
        // - "expired": had a subscription but the paid period has passed
        // - "none": never subscribed
        let subscriptionStatus: "active" | "cancelled" | "expired" | "none"
        if (organization.mollieSubscriptionId !== null && isPremium) {
            subscriptionStatus = "active"
        } else if (organization.mollieSubscriptionId === null && isPremium) {
            subscriptionStatus = "cancelled"
        } else if (
            organization.subcriptionEndingAt !== null &&
            new Date(organization.subcriptionEndingAt) <= new Date()
        ) {
            subscriptionStatus = "expired"
        } else {
            subscriptionStatus = "none"
        }

        return response({
            context: c,
            statusCode: 200,
            schema: readOrganizationSubscriptionRouteDefinition.schemas.return,
            data: {
                isPremium,
                subcriptionEndingAt: organization.subcriptionEndingAt,
                mollieSubscriptionId: organization.mollieSubscriptionId,
                status: latestPayment?.status ?? null,
                subscriptionStatus,
            },
        })
    })
