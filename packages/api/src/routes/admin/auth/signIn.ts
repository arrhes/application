import { pbkdf2Sync } from "node:crypto"
import { adminSignInRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { serializeCookie } from "../../../utilities/cookies/serializeCookie.js"
import { signString } from "../../../utilities/cookies/signString.js"
import { Exception } from "../../../utilities/exception.js"
import { getRemoteAddress } from "../../../utilities/getRemoteAddress.js"
import { response } from "../../../utilities/response.js"
import { insertOne } from "../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../utilities/sql/selectOne.js"
import { getCookieSecurityOptions, productName, userSessionCookieMaxAge } from "../../../utilities/variables.js"

export const adminSignInRoute = apiFactory.createApp().post(adminSignInRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: adminSignInRouteDefinition.schemas.body,
    })

    const adminUser = await selectOne({
        database: c.var.clients.sql,
        table: models.user,
        where: (table) => eq(table.email, body.email.trim().toLowerCase()),
    })

    if (adminUser.isSuperAdmin !== true) {
        throw new Exception({
            statusCode: 401,
            internalMessage: "Error signing in admin",
            externalMessage: "Acces admin refuse",
            cause: "User is not super admin",
        })
    }

    const passwordHash = pbkdf2Sync(body.password, adminUser.passwordSalt, 128000, 64, "sha512").toString("hex")
    if (passwordHash !== adminUser.passwordHash) {
        throw new Exception({
            statusCode: 400,
            internalMessage: "Error signing in admin",
            externalMessage: "Identifiants incorrects",
            cause: "Password does not match the database one",
        })
    }

    // Store the session
    const adminUserSession = await insertOne({
        database: c.var.clients.sql,
        table: models.userSession,
        data: {
            id: generateId(),
            idUser: adminUser.id,
            isActive: true,
            expiresAt: new Date(Date.now() + userSessionCookieMaxAge).toISOString(),
            ip: getRemoteAddress({ context: c }),
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
        },
    })

    // Set cookies
    const cookieSecurity = getCookieSecurityOptions(c.var.env.ENV)
    c.res.headers.append(
        "Set-Cookie",
        serializeCookie({
            name: `${productName}_id_admin_user_session`,
            value: signString({
                value: adminUserSession.id,
                secret: c.var.env.COOKIES_KEY,
            }),
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
            value: String(true),
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
        schema: adminSignInRouteDefinition.schemas.return,
        data: {},
    })
})
