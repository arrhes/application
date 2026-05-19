import type { routeDefinition } from "@arrhes/application-metadata/utilities"
import { toast } from "@arrhes/ui"
import type * as v from "valibot"
import { ClientError } from "./clientError.js"
import { getCookie } from "./cookies/getCookie.js"
import { resolveApiBaseUrl } from "./resolveApiBaseUrl.js"
import { validate } from "./validate.js"
import { cookiePrefix } from "./variables.js"

/**
 * Interpolates URL path params (e.g. `:idOrganization`) with values from the
 * `params` map. Any remaining body fields (not consumed as path params) are
 * sent as query string for GET requests, or as the JSON body for POST/PATCH/DELETE.
 */
function buildUrl(
    apiBaseUrl: string,
    rawPath: string,
    params: Record<string, string> | undefined,
    body: Record<string, unknown>,
    method: "GET" | "POST" | "PATCH" | "DELETE",
): {
    url: URL
    remainingBody: Record<string, unknown>
} {
    let path = rawPath
    const consumed = new Set<string>()

    if (params) {
        for (const [key, value] of Object.entries(params)) {
            const token = `:${key}`
            if (path.includes(token)) {
                path = path.replace(token, encodeURIComponent(value))
                consumed.add(key)
            }
        }
    }

    const url = new URL(`${apiBaseUrl}${path}`)
    const remaining = Object.fromEntries(Object.entries(body).filter(([k]) => !consumed.has(k)))

    if (method === "GET") {
        for (const [key, value] of Object.entries(remaining)) {
            if (value !== undefined && value !== null) {
                url.searchParams.set(key, String(value))
            }
        }
    }

    return {
        url,
        remainingBody: remaining,
    }
}

export async function getResponseBodyFromAPI<
    TSchemaBody extends v.ObjectSchema<v.ObjectEntries, undefined>,
    TSchemaReturn extends
        | v.ObjectSchema<v.ObjectEntries, undefined>
        | v.ArraySchema<v.ObjectSchema<v.ObjectEntries, undefined>, undefined>,
>(parameters: {
    routeDefinition: ReturnType<typeof routeDefinition<string, TSchemaBody, TSchemaReturn>>
    body: v.InferOutput<TSchemaBody>
    /** URL path params to interpolate (e.g. `{ idOrganization: "abc" }` for `:idOrganization`) */
    params?: Record<string, string>
    signal?: AbortSignal
    hasToastMessage?: boolean
}) {
    const apiBaseUrl = resolveApiBaseUrl(import.meta.env.VITE_API_BASE_URL)

    if (!apiBaseUrl) {
        console.error(
            "VITE_API_BASE_URL is not defined. The request will not be sent. " +
                "Make sure the environment variable is set at build time.",
        )
        return <const>{
            ok: false,
            data: undefined,
            error: new ClientError({
                message: "VITE_API_BASE_URL is not defined",
            }),
        }
    }

    const method = parameters.routeDefinition.method
    const abortController = parameters.signal ? undefined : new AbortController()
    const signal = parameters.signal ?? abortController!.signal
    try {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        }

        const idOrganization = getCookie(`${cookiePrefix}_id_organization`)
        if (idOrganization) {
            headers["X-Organization-Id"] = idOrganization
        }

        const { url, remainingBody } = buildUrl(
            apiBaseUrl,
            parameters.routeDefinition.path,
            parameters.params,
            parameters.body as Record<string, unknown>,
            method,
        )

        const response = await fetch(url, {
            method,
            headers,
            credentials: "include",
            body: method === "GET" ? undefined : JSON.stringify(remainingBody),
            signal,
        })
        const jsonResponse = JSON.parse((await response.text()) || "{}")
        if (response.ok === false) {
            throw new ClientError({
                message: `Error with the ${method} request response`,
                cause: jsonResponse.cause ?? jsonResponse.message,
            })
        }

        const parsedData = validate({
            schema: parameters.routeDefinition.schemas.return,
            data: jsonResponse,
        })

        if (parsedData.success === false) {
            throw new ClientError({
                message: "Error with the POST request body data validation",
                rawError: parsedData.error,
            })
        }

        return <const>{
            ok: true,
            data: parsedData.data,
            error: undefined,
        }
    } catch (error: unknown) {
        abortController?.abort()

        if (parameters.hasToastMessage) {
            const clientError =
                error instanceof ClientError
                    ? error
                    : new ClientError({
                          rawError: error,
                      })

            let validationMessages: string | undefined
            try {
                const parsed = JSON.parse(clientError.cause ?? "")
                if (parsed?.nested && typeof parsed.nested === "object") {
                    validationMessages = Object.entries(parsed.nested as Record<string, string[]>)
                        .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
                        .join(" | ")
                }
            } catch {
                // cause is not a JSON validation error string, ignore
            }

            if (validationMessages) {
                toast({
                    title: "Requête invalide",
                    description: validationMessages,
                    variant: "error",
                })
            } else {
                toast({
                    title: clientError.cause ?? "Erreur avec l'API.",
                    variant: "error",
                })
            }
        }

        return <const>{
            ok: false,
            data: undefined,
            error:
                error instanceof ClientError
                    ? error
                    : new ClientError({
                          rawError: error,
                      }),
        }
    }
}
