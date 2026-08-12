import { createOneFileRouteDefinition, generateId, models } from "@comptasse/application-metadata"
import { checkAuthMiddleware } from "../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../utilities/sql/insertOne.js"

export const createOneFileRoute = registerRoute(createOneFileRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneFileRouteDefinition.schemas.body,
    })

    const createOneFile = await insertOne({
        database: c.var.clients.sql,
        table: models.file,
        data: {
            id: generateId(),
            idOrganization: idOrganization,
            idFolder: body.idFolder,
            reference: body.reference,
            name: body.name,
            storageKey: null,
            type: null,
            size: null,
            hash: body.hash,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: auth.user.id,
            lastUpdatedBy: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneFileRouteDefinition.schemas.return,
        data: createOneFile,
    })
})
