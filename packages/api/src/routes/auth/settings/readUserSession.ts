import { readUserSessionRouteDefinition } from "@arrhes/application-metadata"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { response } from "../../../utilities/response.js"

export const readUserSessionRoute = apiFactory.createApp().post(readUserSessionRouteDefinition.path, async (c) => {
    const { user, userSession } = await checkUserSessionMiddleware({ context: c })

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
