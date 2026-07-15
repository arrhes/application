import { models, ocrFileRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { processOcr } from "../../../../../../../../utilities/ocr/processOcr.js"
import { registerRoute } from "../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"

export const ocrFileRoute = registerRoute(ocrFileRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: ocrFileRouteDefinition.schemas.body,
    })
    const sourceFile = await selectOne({
        database: c.var.clients.sql,
        table: models.file,
        where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.id, body.idFile)),
    })

    const { ocrFile } = await processOcr({
        var: c.var,
        idOrganization: idOrganization,
        idUser: auth.user.id,
        sourceFile: {
            id: sourceFile.id,
            idFolder: sourceFile.idFolder,
            reference: sourceFile.reference,
            name: sourceFile.name,
            storageKey: sourceFile.storageKey,
            type: sourceFile.type,
        },
        credentials: {
            ocrEndpoint: auth.user.ocrEndpoint,
            ocrApiKey: auth.user.ocrApiKey,
            ocrModel: auth.user.ocrModel,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: ocrFileRouteDefinition.schemas.return,
        data: {
            file: ocrFile,
        },
    })
})
