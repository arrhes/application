import { deleteOneUserApiKeyRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../middlewares/checkAuthMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../utilities/registerRoute.js"
import { response } from "../../../../utilities/response.js"

export const deleteOneUserApiKeyRoute = registerRoute(deleteOneUserApiKeyRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: deleteOneUserApiKeyRouteDefinition.schemas.body,
    })

    await c.var.clients.sql
        .delete(models.apiKey)
        .where(and(eq(models.apiKey.idUser, auth.user.id), eq(models.apiKey.id, body.idApiKey)))

    return response({
        context: c,
        statusCode: 200,
        schema: deleteOneUserApiKeyRouteDefinition.schemas.return,
        data: {},
    })
})
