import { createOneFolderRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkAuthMiddleware } from "../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../utilities/sql/insertOne.js"

export const createOneFolderRoute = registerRoute(createOneFolderRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneFolderRouteDefinition.schemas.body,
    })

    const createOneFolder = await insertOne({
        database: c.var.clients.sql,
        table: models.folder,
        data: {
            id: generateId(),
            idOrganization: idOrganization,
            idFolderParent: body.idFolderParent ?? null,
            name: body.name,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: auth.user.id,
            lastUpdatedBy: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneFolderRouteDefinition.schemas.return,
        data: createOneFolder,
    })
})
