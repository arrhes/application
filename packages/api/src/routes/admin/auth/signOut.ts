import { adminSignOutRouteDefinition, models } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { parseCookies } from "../../../utilities/cookies/parseCookies.js"
import { serializeCookie } from "../../../utilities/cookies/serializeCookie.js"
import { unsignString } from "../../../utilities/cookies/unsignString.js"
import { Exception } from "../../../utilities/exception.js"
import { response } from "../../../utilities/response.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"
import { getCookieSecurityOptions, productName, userSessionCookieMaxAge } from "../../../utilities/variables.js"

export const adminSignOutRoute = apiFactory.createApp().post(adminSignOutRouteDefinition.path, async (c) => {
    const _body = await validateBodyMiddleware({
        context: c,
        schema: adminSignOutRouteDefinition.schemas.body,
    })

    try {
        const idAdminUserSession = unsignString({
            signedValue: parseCookies({ value: c.req.header("cookie") })[`${productName}_id_admin_user_session`],
            secret: c.var.env.COOKIES_KEY,
        })

        if (idAdminUserSession === undefined) {
            throw new Exception({
                statusCode: 401,
                internalMessage: "Invalid admin session",
                cause: "idAdminUserSession not found in signed cookie",
            })
        }

        await updateOne({
            database: c.var.clients.sql,
            table: models.adminUserSession,
            data: {
                lastUpdatedAt: new Date().toISOString(),
                isActive: false,
            },
            where: (table) => eq(table.id, idAdminUserSession),
        })
    } catch (_error: unknown) {
        // do nothing
    }

    const cookieSecurity = getCookieSecurityOptions(c.var.env.ENV)
    c.res.headers.append(
        "Set-Cookie",
        serializeCookie({
            name: `${productName}_id_admin_user_session`,
            value: "",
            options: {
                maxAge: userSessionCookieMaxAge,
                httpOnly: true,
                ...cookieSecurity,
                domain: c.var.env.COOKIES_DOMAIN,
                path: "/",
            },
        }),
    )
    c.res.headers.append(
        "Set-Cookie",
        serializeCookie({
            name: `${productName}_is_admin_auth`,
            value: String(false),
            options: {
                maxAge: userSessionCookieMaxAge,
                httpOnly: false,
                ...cookieSecurity,
                domain: c.var.env.COOKIES_DOMAIN,
                path: "/",
            },
        }),
    )

    return response({
        context: c,
        statusCode: 200,
        schema: adminSignOutRouteDefinition.schemas.return,
        data: {},
    })
})
