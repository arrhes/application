import { readAdminUserSessionRouteDefinition } from "@arrhes/application-metadata"
import { checkAdminUserSessionMiddleware } from "../../../middlewares/checkAdminUserSessionMiddleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { response } from "../../../utilities/response.js"

export const readAdminUserSessionRoute = apiFactory
    .createApp()
    .post(readAdminUserSessionRouteDefinition.path, async (c) => {
        const { adminUser, adminUserSession } = await checkAdminUserSessionMiddleware({ context: c })

        return response({
            context: c,
            statusCode: 200,
            schema: readAdminUserSessionRouteDefinition.schemas.return,
            data: {
                ...adminUserSession,
                adminUser: adminUser,
            },
        })
    })
