import { readUserSessionRouteDefinition } from "@arrhes/application-metadata"
import { requireCookieSessionMiddleware } from "../../../middlewares/requireCookieSessionMiddleware.js"
import { registerRoute } from "../../../utilities/registerRoute.js"
import { response } from "../../../utilities/response.js"

export const readUserSessionRoute = registerRoute(readUserSessionRouteDefinition, async (c) => {
    const { user, userSession } = await requireCookieSessionMiddleware({
        context: c,
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readUserSessionRouteDefinition.schemas.return,
        data: {
            ...userSession,
            user: user,
        },
    })
})
