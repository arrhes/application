import { finalizeFileUploadRouteDefinition, models } from "@comptasse/application-metadata"
import { HeadObjectCommand } from "@aws-sdk/client-s3"
import { and, eq, sql } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../../../utilities/apiFactory.js"
import { processOcr } from "../../../../../../../../utilities/ocr/processOcr.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../../../../utilities/sql/updateOne.js"
import { getOrganizationS3Client } from "../../../../../../../../utilities/storage/getOrganizationS3Client.js"

export const finalizeFileUploadRoute = apiFactory
    .createApp()
    .post(finalizeFileUploadRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: finalizeFileUploadRouteDefinition.schemas.body,
        })

        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })

        const s3Client =
            organization.storageEndpoint && organization.storageAccessKey && organization.storageSecretKey
                ? getOrganizationS3Client(organization)
                : undefined
        const bucketName = organization.storageBucketName ?? c.var.env.STORAGE_BUCKET_NAME
        const storageClient = s3Client ?? c.var.clients.storage

        const storageKey = `organizations/${idOrganization}/storage/${body.idFile}`
        const storageHead = await storageClient.send(
            new HeadObjectCommand({
                Bucket: bucketName,
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
                lastUpdatedBy: auth.user.id,
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

        let ocrFile: typeof models.file.$inferSelect | undefined
        if (body.ocr) {
            const ocrResult = await processOcr({
                var: c.var,
                idOrganization: idOrganization,
                idUser: auth.user.id,
                sourceFile: {
                    id: updateOneFile.id,
                    idFolder: updateOneFile.idFolder,
                    reference: updateOneFile.reference,
                    name: updateOneFile.name,
                    storageKey: updateOneFile.storageKey,
                    type: updateOneFile.type,
                },
            })
            ocrFile = ocrResult.ocrFile
        }

        return response({
            context: c,
            statusCode: 200,
            schema: finalizeFileUploadRouteDefinition.schemas.return,
            data: {
                file: updateOneFile,
                ocrFile,
            },
        })
    })
