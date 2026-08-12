import type { Context } from "hono"
import { parseCookies } from "../utilities/cookies/parseCookies.js"
import { Exception } from "../utilities/exception.js"
import { productName } from "../utilities/variables.js"

/**
 * Resolves idOrganization from the request context using the following priority:
 * 1. URL path param `:idOrganization` (highest - used by REST routes like /v1/organizations/:idOrganization)
 * 2. X-Organization-Id header
 * 3. comptasse_id_organization cookie
 * 4. body.idOrganization (legacy fallback)
 *
 * For Bearer token auth, the caller should use apiKey.idOrganization directly
 * instead of calling this middleware.
 */
export async function resolveOrganizationMiddleware(parameters: { context: Context<any> }): Promise<string> {
    // 1. URL path param (REST routes)
    // Guard: skip unresolved template literals (e.g. the literal ":idOrganization"
    // that appears when the client omits URL substitution).
    const paramValue = parameters.context.req.param("idOrganization")
    if (paramValue && !paramValue.startsWith(":")) {
        return paramValue
    }

    // 2. X-Organization-Id header
    const headerValue = parameters.context.req.header("X-Organization-Id")
    if (headerValue) {
        return headerValue
    }

    // 3. comptasse_id_organization cookie
    const cookieMap = parseCookies({
        value: parameters.context.req.header("Cookie"),
    })
    const cookieValue = cookieMap[`${productName}_id_organization`]
    if (cookieValue) {
        return cookieValue
    }

    // 4. body.idOrganization (legacy fallback)
    try {
        const body = await parameters.context.req.json()
        if (body?.idOrganization) {
            return body.idOrganization
        }
    } catch {
        // Body parsing failed or no body - continue to throw
    }

    throw new Exception({
        statusCode: 400,
        internalMessage: "Could not resolve organization",
        externalMessage: "Organization identifier is required",
        cause: "No idOrganization found in URL param, X-Organization-Id header, cookie, or request body",
    })
}
