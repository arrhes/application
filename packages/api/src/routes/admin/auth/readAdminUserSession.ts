import { readAdminUserSessionRouteDefinition } from "@arrhes/application-metadata"
import { checkAdminUserSessionMiddleware } from "../../../middlewares/checkAdminUserSessionMiddleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { Exception } from "../../../utilities/exception.js"
import { response } from "../../../utilities/response.js"

export const readAdminUserSessionRoute = apiFactory
    .createApp()
    .post(readAdminUserSessionRouteDefinition.path, async (c) => {
        const { adminUser, adminUserSession } = await checkAdminUserSessionMiddleware({ context: c })

        if (!adminUser || !adminUserSession) {
            throw new Exception({
                statusCode: 401,
                internalMessage: "Admin auth error",
                externalMessage: "Session admin requise",
                cause: "Dashboard super admin session cannot read admin user session",
            })
        }

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
