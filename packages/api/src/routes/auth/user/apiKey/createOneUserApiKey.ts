import { createHash } from "node:crypto"
import { createOneUserApiKeyRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkAuthMiddleware } from "../../../../middlewares/checkAuthMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../utilities/registerRoute.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"

export const createOneUserApiKeyRoute = registerRoute(createOneUserApiKeyRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneUserApiKeyRouteDefinition.schemas.body,
    })

    const rawKey = generateId()
    const keyHash = createHash("sha256").update(rawKey).digest("hex")

    const createOneApiKey = await insertOne({
        database: c.var.clients.sql,
        table: models.apiKey,
        data: {
            id: generateId(),
            idOrganization: null,
            idUser: auth.user.id,
            keyHash: keyHash,
            name: body.name ?? new Date().toISOString(),
            isDefault: false,
            isActive: true,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneUserApiKeyRouteDefinition.schemas.return,
        data: {
            ...createOneApiKey,
            rawKey: rawKey,
        },
    })
})
