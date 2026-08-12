import { createOneTagRouteDefinition, generateId, models } from "@comptasse/application-metadata"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../../utilities/sql/insertOne.js"

export const createOneTagRoute = registerRoute(createOneTagRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneTagRouteDefinition.schemas.body,
    })

    const createOneTag = await insertOne({
        database: c.var.clients.sql,
        table: models.tag,
        data: {
            id: generateId(),
            idOrganization: idOrganization,
            idYear: body.idYear,

            label: body.label,

            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: auth.user.id,
            lastUpdatedBy: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneTagRouteDefinition.schemas.return,
        data: createOneTag,
    })
})
