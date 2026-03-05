import { generateFilePutSignedUrlRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq, sql } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { Exception } from "../../../../../utilities/exception.js"
import { response } from "../../../../../utilities/response.js"
import { selectOne } from "../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../utilities/sql/updateOne.js"
import { generatePutSignedUrl } from "../../../../../utilities/storage/generatePutSignedUrl.js"

export const generateFilePutSignedUrlRoute = apiFactory
    .createApp()
    .post(generateFilePutSignedUrlRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: generateFilePutSignedUrlRouteDefinition.schemas.body,
        })

        if (body.size > 50_000_000) {
            throw new Exception({
                internalMessage: "File size is too big",
                statusCode: 400,
                externalMessage: "Fichier trop volumineux",
            })
        }

        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })

        if (organization.storageCurrentUsage + body.size > organization.storageLimit) {
            throw new Exception({
                internalMessage: "Storage limit exceeded",
                statusCode: 400,
                externalMessage: "Limite de stockage atteinte",
            })
        }

        const storageKey = `organizations/${idOrganization}/${body.idYear}/files/${body.idFile}`

        const updateOneFile = await updateOne({
            database: c.var.clients.sql,
            table: models.file,
            data: {
                storageKey: storageKey,
                type: body.type,
                size: body.size,
                lastUpdatedAt: new Date().toISOString(),
            },
            where: (table) =>
                and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear), eq(table.id, body.idFile)),
        })

        await updateOne({
            database: c.var.clients.sql,
            table: models.organization,
            data: {
                storageCurrentUsage: sql`${models.organization.storageCurrentUsage} + ${body.size}`,
            },
            where: (table) => eq(table.id, idOrganization),
        })

        const url = await generatePutSignedUrl({
            var: c.var,
            storageKey: storageKey,
            contentLength: body.size,
            contentType: body.type,
            metadata: {
                idOrganization: idOrganization,
                idYear: body.idYear,
                idUser: user.id,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: generateFilePutSignedUrlRouteDefinition.schemas.return,
            data: {
                file: updateOneFile,
                url: url,
            },
        })
    })
