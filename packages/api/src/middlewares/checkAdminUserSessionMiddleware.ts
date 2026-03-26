import { models } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import type { Context } from "hono"
import { parseCookies } from "../utilities/cookies/parseCookies.js"
import { unsignString } from "../utilities/cookies/unsignString.js"
import { Exception } from "../utilities/exception.js"
import { productName } from "../utilities/variables.js"

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
            throw new Exception({
                internalMessage: "Admin auth error",
                cause: "No admin session cookie found",
            })
        }

        const adminUserSession = await parameters.context.var.clients.sql.query.adminUserSessionModel.findFirst({
            where: eq(models.adminUserSession.id, idAdminUserSession),
        })

        if (!adminUserSession || adminUserSession.isActive === false) {
            throw new Exception({
                internalMessage: "Admin auth error",
                cause: "Admin session not found or inactive",
            })
        }

        const adminUser = await parameters.context.var.clients.sql.query.adminUserModel.findFirst({
            where: eq(models.adminUser.id, adminUserSession.idAdminUser),
        })

        if (!adminUser) {
            throw new Exception({
                internalMessage: "Admin auth error",
                cause: "Admin user not found",
            })
        }

        parameters.context.set("adminUser", adminUser)

        return {
            adminUserSession: adminUserSession,
            adminUser: adminUser,
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
