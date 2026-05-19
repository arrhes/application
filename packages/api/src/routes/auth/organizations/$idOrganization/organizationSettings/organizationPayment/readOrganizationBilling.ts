import { models, readOrganizationBillingRouteDefinition } from "@arrhes/application-metadata"
import { and, desc, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { computeMonthlyTotal } from "../../../../../../utilities/billing/computeMonthlyTotal.js"
import { response } from "../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const readOrganizationBillingRoute = apiFactory
    .createApp()
    .post(readOrganizationBillingRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        const _body = await validateBodyMiddleware({
            context: c,
            schema: readOrganizationBillingRouteDefinition.schemas.body,
        })

        // Verify auth.user is member of the organization
        await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idUser, auth.user.id), eq(table.idOrganization, idOrganization)),
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
        const totalSubscriptionAmountInCents = await computeMonthlyTotal({
            var: c.var,
            idOrganization,
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readOrganizationBillingRouteDefinition.schemas.return,
            data: {
                status: latestPayment?.status ?? null,
                licenceAmount: organization.licenceAmount,
                storageLimit: organization.storageLimit,
                storageCurrentUsage: organization.storageCurrentUsage,
                ocrPagesTotalAvailable: organization.ocrPagesTotalAvailable,
                ocrPagesTotalUsed: organization.ocrPagesTotalUsed,
                tokensTotalAvailable: organization.tokensTotalAvailable,
                tokensTotalUsed: organization.tokensTotalUsed,
                totalSubscriptionAmountInCents,
            },
        })
    })
