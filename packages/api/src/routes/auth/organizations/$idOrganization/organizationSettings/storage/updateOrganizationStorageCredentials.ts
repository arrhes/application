import { models, updateOrganizationStorageCredentialsRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { response } from "../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../../utilities/sql/updateOne.js"

export const updateOrganizationStorageCredentialsRoute = apiFactory
    .createApp()
    .patch(updateOrganizationStorageCredentialsRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateOrganizationStorageCredentialsRouteDefinition.schemas.body,
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

        await updateOne({
            database: c.var.clients.sql,
            table: models.organization,
            data: {
                storageEndpoint: body.storageEndpoint ?? null,
                storageAccessKey: body.storageAccessKey ?? null,
                storageSecretKey: body.storageSecretKey ?? null,
                storageBucketName: body.storageBucketName ?? null,
                storageRegion: body.storageRegion ?? null,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: auth.user.id,
            },
            where: (table) => eq(table.id, idOrganization),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateOrganizationStorageCredentialsRouteDefinition.schemas.return,
            data: {
                success: true,
            },
        })
    })
