import { models, signOutRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { validateBodyMiddleware } from "../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../utilities/apiFactory.js"
import { parseCookies } from "../../utilities/cookies/parseCookies.js"
import { serializeCookie } from "../../utilities/cookies/serializeCookie.js"
import { unsignString } from "../../utilities/cookies/unsignString.js"
import { Exception } from "../../utilities/exception.js"
import { response } from "../../utilities/response.js"
import { updateOne } from "../../utilities/sql/updateOne.js"
import { getCookieSecurityOptions, productName, userSessionCookieMaxAge } from "../../utilities/variables.js"

export const signOutRoute = apiFactory.createApp().post(signOutRouteDefinition.path, async (c) => {
    const _body = await validateBodyMiddleware({
        context: c,
        schema: signOutRouteDefinition.schemas.body,
    })

    try {
        const idUserSession = unsignString({
            signedValue: parseCookies({ value: c.req.header("cookie") })[`${productName}_${"id_user_session"}`],
            secret: c.var.env.COOKIES_KEY,
        })

        if (idUserSession === undefined) {
            throw new Exception({
                statusCode: 401,
                internalMessage: "Invalid session",
                cause: "idUserSession not found in signed cookie",
            })
        }

        await updateOne({
            database: c.var.clients.sql,
            table: models.userSession,
            data: {
                lastUpdatedAt: new Date().toISOString(),
                isActive: false,
            },
            where: (table) => eq(table.id, idUserSession),
        })
    } catch (_erro: unknown) {
        // do nothing
    }

    const cookieSecurity = getCookieSecurityOptions(c.var.env.ENV)
    c.res.headers.append(
        "Set-Cookie",
        serializeCookie({
            name: `${productName}_${"id_user_session"}`,
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
            name: `${productName}_${"is_auth"}`,
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
        schema: signOutRouteDefinition.schemas.return,
        data: {},
    })
})
