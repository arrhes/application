import { models, updateUserLlmCredentialsRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../middlewares/checkAuthMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../utilities/registerRoute.js"
import { response } from "../../../../utilities/response.js"

export const updateUserLlmCredentialsRoute = registerRoute(updateUserLlmCredentialsRouteDefinition, async (c) => {
    const { user } = await checkAuthMiddleware({
        context: c,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateUserLlmCredentialsRouteDefinition.schemas.body,
    })

    await c.var.clients.sql
        .update(models.user)
        .set({
            llmApiKey: body.llmApiKey ?? null,
            llmBaseUrl: body.llmBaseUrl ?? null,
            llmModel: body.llmModel ?? null,
            ocrEndpoint: body.ocrEndpoint ?? null,
            ocrApiKey: body.ocrApiKey ?? null,
            ocrModel: body.ocrModel ?? null,
        })
        .where(eq(models.user.id, user.id))

    return response({
        context: c,
        statusCode: 200,
        schema: updateUserLlmCredentialsRouteDefinition.schemas.return,
        data: {
            success: true,
        },
    })
})
