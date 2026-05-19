import { cancelOrganizationBillingRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq, sql } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { response } from "../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../../utilities/sql/updateOne.js"

// How much each resource unit removes from limits (mirrors createResourceSubscription)
const UNIT_LIMITS = {
    storage_gb: {
        storageLimit: 1_073_741_824,
        ocrPagesTotalAvailable: 0,
        tokensTotalAvailable: 0,
    },
    agent_tokens_million: {
        storageLimit: 0,
        ocrPagesTotalAvailable: 0,
        tokensTotalAvailable: 1_000_000,
    },
    ocr_pages_hundred: {
        storageLimit: 0,
        ocrPagesTotalAvailable: 100,
        tokensTotalAvailable: 0,
    },
    support: {
        storageLimit: 0,
        ocrPagesTotalAvailable: 0,
        tokensTotalAvailable: 0,
    },
} as const

function getEndOfCurrentMonth(): Date {
    const now = new Date()
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999))
}

export const cancelOrganizationBillingRoute = apiFactory
    .createApp()
    .post(cancelOrganizationBillingRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: cancelOrganizationBillingRouteDefinition.schemas.body,
        })

        const organizationUser = await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idUser, auth.user.id), eq(table.idOrganization, idOrganization)),
        })
        if (organizationUser.isAdmin === false) {
            throw new Exception({
                statusCode: 401,
                internalMessage: "User is not admin of the organization",
                externalMessage: "Vous n'êtes pas administrateur de l'organisation",
            })
        }

        // Find the subscription to cancel — must belong to this org
        const subscription = await selectOne({
            database: c.var.clients.sql,
            table: models.organizationBilling,
            where: (table) =>
                and(eq(table.id, body.idBilling), eq(table.idOrganization, idOrganization), eq(table.status, "active")),
        })

        const now = new Date()
        const endsAt = getEndOfCurrentMonth()
        const limits = UNIT_LIMITS[subscription.type]

        // Mark as cancelled; revert org limits immediately for resource subs
        await updateOne({
            database: c.var.clients.sql,
            table: models.organizationBilling,
            data: {
                status: "cancelled",
                endsAt: endsAt.toISOString(),
                lastUpdatedAt: now.toISOString(),
                lastUpdatedBy: auth.user.id,
            },
            where: (table) => eq(table.id, subscription.id),
        })

        if (subscription.type !== "support") {
            await updateOne({
                database: c.var.clients.sql,
                table: models.organization,
                data: {
                    storageLimit:
                        limits.storageLimit > 0
                            ? sql`${models.organization.storageLimit} - ${limits.storageLimit * subscription.quantity}`
                            : undefined,
                    ocrPagesTotalAvailable:
                        limits.ocrPagesTotalAvailable > 0
                            ? sql`${models.organization.ocrPagesTotalAvailable} - ${limits.ocrPagesTotalAvailable * subscription.quantity}`
                            : undefined,
                    tokensTotalAvailable:
                        limits.tokensTotalAvailable > 0
                            ? sql`${models.organization.tokensTotalAvailable} - ${limits.tokensTotalAvailable * subscription.quantity}`
                            : undefined,
                    lastUpdatedAt: now.toISOString(),
                },
                where: (table) => eq(table.id, idOrganization),
            })
        }

        return response({
            context: c,
            statusCode: 200,
            schema: cancelOrganizationBillingRouteDefinition.schemas.return,
            data: {},
        })
    })
