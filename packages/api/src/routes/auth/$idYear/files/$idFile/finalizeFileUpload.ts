import { finalizeFileUploadRouteDefinition, models } from "@arrhes/application-metadata"
import { HeadObjectCommand } from "@aws-sdk/client-s3"
import { and, eq, sql } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { updateOne } from "../../../../../utilities/sql/updateOne.js"

export const finalizeFileUploadRoute = apiFactory
    .createApp()
    .post(finalizeFileUploadRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: finalizeFileUploadRouteDefinition.schemas.body,
        })

        const storageKey = `organizations/${idOrganization}/storage/${body.idFile}`
        const storageHead = await c.var.clients.storage.send(
            new HeadObjectCommand({
                Bucket: c.var.env.STORAGE_BUCKET_NAME,
                Key: storageKey,
            }),
        )

        const updateOneFile = await updateOne({
            database: c.var.clients.sql,
            table: models.file,
            data: {
                storageKey: storageKey,
                type: storageHead.ContentType,
                size: storageHead.ContentLength,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: user.id,
            },
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.id, body.idFile)),
        })

        await updateOne({
            database: c.var.clients.sql,
            table: models.organization,
            data: {
                storageCurrentUsage: sql`${models.organization.storageCurrentUsage} + ${storageHead.ContentLength}`,
            },
            where: (table) => eq(table.id, idOrganization),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: finalizeFileUploadRouteDefinition.schemas.return,
            data: updateOneFile,
        })
    })
