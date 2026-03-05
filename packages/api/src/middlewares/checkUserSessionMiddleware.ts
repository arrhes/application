import { createHash } from "node:crypto"
import { models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import type { Context } from "hono"
import { parseCookies } from "../utilities/cookies/parseCookies.js"
import { unsignString } from "../utilities/cookies/unsignString.js"
import { Exception } from "../utilities/exception.js"
import { productName } from "../utilities/variables.js"
import { resolveOrganizationMiddleware } from "./resolveOrganizationMiddleware.js"

export async function checkUserSessionMiddleware(parameters: { context: Context<any> }) {
    try {
        // 1. Try cookie auth first
        const cookieAuth = await tryAuthWithCookie(parameters.context)
        if (cookieAuth) {
            return cookieAuth
        }

        // 2. Try Bearer token auth (API key)
        const bearerAuth = await tryAuthWithBearer(parameters.context)
        if (bearerAuth) {
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

        const userSession = await context.var.clients.sql.query.userSessionModel.findFirst({
            where: eq(models.userSession.id, idUserSession),
        })

        if (!userSession || userSession.isActive === false) {
            return null
        }

        const user = await context.var.clients.sql.query.userModel.findFirst({
            where: eq(models.user.id, userSession.idUser),
        })

        if (!user) {
            return null
        }

        context.set("user", user)

        // Resolve idOrganization from header/cookie/body for cookie-based auth
        let idOrganization: string | undefined
        try {
            idOrganization = await resolveOrganizationMiddleware({ context })
        } catch {
            // idOrganization is optional — some routes don't need it
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

    const apiKey = await context.var.clients.sql.query.apiKeyModel.findFirst({
        where: and(eq(models.apiKey.keyHash, keyHash), eq(models.apiKey.isActive, true)),
    })

    if (!apiKey) {
        return null
    }

    const user = await context.var.clients.sql.query.userModel.findFirst({
        where: eq(models.user.id, apiKey.idUser),
    })

    if (!user) {
        return null
    }

    context.set("user", user)

    // For Bearer auth, idOrganization comes from the API key record
    return {
        userSession: null,
        user: user,
        idOrganization: apiKey.idOrganization,
    }
}
