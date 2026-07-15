import { models, readAllUserApiKeysRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../middlewares/checkAuthMiddleware.js"
import { registerRoute } from "../../../../utilities/registerRoute.js"
import { response } from "../../../../utilities/response.js"

export const readAllUserApiKeysRoute = registerRoute(readAllUserApiKeysRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })

    const apiKeys = await c.var.clients.sql.select().from(models.apiKey).where(eq(models.apiKey.idUser, auth.user.id))

    return response({
        context: c,
        statusCode: 200,
        schema: readAllUserApiKeysRouteDefinition.schemas.return,
        data: apiKeys,
    })
})
