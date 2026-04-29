import { models, updateStorageSubscriptionRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { FREE_STORAGE_BYTES } from "../../../../utilities/billing/subscriptionPricing.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"

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

        const nextStorageMaxUsage = FREE_STORAGE_BYTES + body.newQuantity * FREE_STORAGE_BYTES

        // Store as pending — applied on the 1st of next month by the worker
        const pendingValue = nextStorageMaxUsage === organization.storageMaxUsage ? null : nextStorageMaxUsage

        await updateOne({
            database: c.var.clients.sql,
            table: models.organization,
            data: {
                pendingStorageMaxUsage: pendingValue,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: user.id,
            },
            where: (table) => eq(table.id, idOrganization),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateStorageSubscriptionRouteDefinition.schemas.return,
            data: {},
        })
    })
