import { createHash } from "node:crypto"
import { models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import type { Context } from "hono"
import { parseCookies } from "../utilities/cookies/parseCookies.js"
import { unsignString } from "../utilities/cookies/unsignString.js"
import { Exception } from "../utilities/exception.js"
import { selectOne } from "../utilities/sql/selectOne.js"
import { productName } from "../utilities/variables.js"
import { resolveOrganizationMiddleware } from "./resolveOrganizationMiddleware.js"

export async function checkAuthMiddleware(parameters: { context: Context<any> }) {
    try {
        // 1. Try cookie auth first
        const cookieAuth = await tryAuthWithCookie(parameters.context)
        if (cookieAuth !== null) {
            return cookieAuth
        }

        // 2. Try Bearer token auth (API key)
        const bearerAuth = await tryAuthWithBearer(parameters.context)
        if (bearerAuth !== null) {
            return bearerAuth
        }

        throw new Exception({
            internalMessage: "Auth error",
            cause: "No valid authentication method found",
        })
    } catch (error: unknown) {
        if (error instanceof Exception) {
            throw new Exception({
                statusCode: 401,
                internalMessage: "Auth error",
                rawError: error,
            })
        }
        throw new Exception({
            statusCode: 401,
            internalMessage: "Auth error",
            rawError: error,
        })
    }
}

async function tryAuthWithCookie(context: Context<any>) {
    try {
        const cookieMap = parseCookies({
            value: context.req.header("Cookie"),
        })

        const idUserSession = unsignString({
            signedValue: cookieMap[`${productName}_id_user_session`],
            secret: context.var.env.COOKIES_KEY,
        })

        if (!idUserSession) {
            return null
        }

        const userSession = await selectOne({
            database: context.var.clients.sql,
            table: models.userSession,
            where: (table) => eq(table.id, idUserSession),
        })

        if (!userSession || userSession.isActive === false) {
            return null
        }

        const user = await selectOne({
            database: context.var.clients.sql,
            table: models.user,
            where: (table) => eq(table.id, userSession.idUser),
        })

        if (!user) {
            return null
        }

        context.set("user", user)

        // Resolve idOrganization from header/cookie/body for cookie-based auth
        let idOrganization: string | undefined
        try {
            idOrganization = await resolveOrganizationMiddleware({
                context,
            })
        } catch {
            // idOrganization is optional - some routes don't need it
            idOrganization = undefined
        }

        return {
            userSession: userSession,
            user: user,
            idOrganization: idOrganization,
        }
    } catch {
        return null
    }
}

async function tryAuthWithBearer(context: Context<any>) {
    const authHeader = context.req.header("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
        return null
    }

    const rawKey = authHeader.slice(7)
    if (!rawKey) {
        return null
    }

    const keyHash = createHash("sha256").update(rawKey).digest("hex")

    const apiKey = await selectOne({
        database: context.var.clients.sql,
        table: models.apiKey,
        where: (table) => and(eq(table.keyHash, keyHash), eq(table.isActive, true)),
    })

    if (!apiKey) {
        return null
    }

    const user = await selectOne({
        database: context.var.clients.sql,
        table: models.user,
        where: (table) => eq(table.id, apiKey.idUser),
    })

    if (!user) {
        return null
    }

    context.set("user", user)

    // For Bearer auth, idOrganization comes from the API key record (may be null for user-level keys)
    return {
        userSession: null,
        user: user,
        idOrganization: apiKey.idOrganization ?? undefined,
    }
}
