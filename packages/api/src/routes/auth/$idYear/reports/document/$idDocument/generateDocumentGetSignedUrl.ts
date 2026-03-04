import { generateDocumentGetSignedUrlRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"
import { generateGetSignedUrl } from "../../../../../../utilities/storage/generateGetSignedUrl.js"

export const generateDocumentGetSignedUrlRoute = apiFactory
    .createApp()
    .post(generateDocumentGetSignedUrlRouteDefinition.path, async (c) => {
        const { idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: generateDocumentGetSignedUrlRouteDefinition.schemas.body,
        })

        const readOneDocument = await selectOne({
            database: c.var.clients.sql,
            table: models.document,
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idDocument),
                ),
        })

        const url = await generateGetSignedUrl({
            var: c.var,
            storageKey: readOneDocument.storageKey,
        })

        return response({
            context: c,
            statusCode: 200,
            schema: generateDocumentGetSignedUrlRouteDefinition.schemas.return,
            data: {
                url: url,
            },
        })
    })
