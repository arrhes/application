import { models } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import type { Context } from "hono"
import { parseCookies } from "../utilities/cookies/parseCookies.js"
import { unsignString } from "../utilities/cookies/unsignString.js"
import { Exception } from "../utilities/exception.js"
import { productName } from "../utilities/variables.js"
import { checkAuthMiddleware } from "./checkAuthMiddleware.js"

async function trySuperAdminDashboardFallback(parameters: { context: Context<any> }) {
    const userSession = await checkAuthMiddleware({
        context: parameters.context,
    })
    if (userSession.user.isSuperAdmin !== true) {
        throw new Exception({
            internalMessage: "Admin auth error",
            cause: "Dashboard user is not super admin",
        })
    }

    return {
        adminUserSession: null,
        adminUser: userSession.user,
        user: userSession.user,
    }
}

export async function checkAdminUserSessionMiddleware(parameters: { context: Context<any> }) {
    try {
        const cookieMap = parseCookies({
            value: parameters.context.req.header("Cookie"),
        })

        const idAdminUserSession = unsignString({
            signedValue: cookieMap[`${productName}_id_admin_user_session`],
            secret: parameters.context.var.env.COOKIES_KEY,
        })

        if (!idAdminUserSession) {
            return trySuperAdminDashboardFallback({
                context: parameters.context,
            })
        }

        const adminUserSession = await parameters.context.var.clients.sql.query.userSessionModel.findFirst({
            where: eq(models.userSession.id, idAdminUserSession),
        })

        if (!adminUserSession || adminUserSession.isActive === false) {
            return trySuperAdminDashboardFallback({
                context: parameters.context,
            })
        }

        const adminUser = await parameters.context.var.clients.sql.query.userModel.findFirst({
            where: eq(models.user.id, adminUserSession.idUser),
        })

        if (adminUser?.isSuperAdmin !== true) {
            return trySuperAdminDashboardFallback({
                context: parameters.context,
            })
        }

        parameters.context.set("adminUser", adminUser)

        return {
            adminUserSession: adminUserSession,
            adminUser: adminUser,
            user: null,
        }
    } catch (error: unknown) {
        if (error instanceof Exception) {
            throw new Exception({
                statusCode: 401,
                internalMessage: "Admin auth error",
                rawError: error,
            })
        }
        throw new Exception({
            statusCode: 401,
            internalMessage: "Admin auth error",
            rawError: error,
        })
    }
}
