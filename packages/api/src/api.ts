import { cors } from "hono/cors"
import { logger } from "hono/logger"
import pg from "postgres"
import * as v from "valibot"
import { routes } from "./routes/routes.js"
import { apiFactory } from "./utilities/apiFactory.js"
import { apiLog } from "./utilities/apiLog.js"
import { Exception } from "./utilities/exception.js"
import type { getClients } from "./utilities/getClients.js"
import type { getEnv } from "./utilities/getEnv.js"
import { response } from "./utilities/response.js"

export async function api(parameters: {
    env: ReturnType<typeof getEnv>
    clients: Awaited<ReturnType<typeof getClients>>
}) {
    try {
        // Create app
        const api = apiFactory
            .createApp()

            // Set logger
            .use(logger())

            // Set env, clients, and appFetch for internal dispatch
            .use(async (c, next) => {
                c.set("env", parameters.env)
                c.set("clients", parameters.clients)
                c.set("appFetch", async (request: Request) => api.fetch(request))
                await next()
            })

            // Set CORS
            .use("/*", async (c, next) => {
                const allowedDomain = c.var.env.CORS_ORIGIN
                const corsMiddlewareHandler = cors({
                    origin: (origin) => {
                        if (!origin) return null
                        const host = origin.replace(/^https?:\/\//, "").split(":")[0]
                        if (host === allowedDomain || host.endsWith(`.${allowedDomain}`)) {
                            return origin
                        }
                        return null
                    },
                    allowHeaders: [
                        "Content-Type",
                        "Authorization",
                        "Cookie",
                        "Set-Cookie",
                        "Credentials",
                        "X-Forwaded-For",
                        "X-Organization-Id",
                        "Cache-Control",
                    ],
                    allowMethods: [
                        "GET",
                        "POST",
                        "PATCH",
                        "DELETE",
                    ],
                    credentials: true,
                })
                return corsMiddlewareHandler(c, next)
            })

            // Set error handler
            .onError(async (error, c) => {
                try {
                    if (error instanceof Exception) {
                        apiLog({
                            var: c.var,
                            type: "error",
                            internalMessage: error.internalMessage,
                            externalMessage: error.externalMessage,
                            cause: error.cause,
                            stack: error.stack,
                        })
                        if (error.statusCode === 500) {
                            return response({
                                context: c,
                                statusCode: 500,
                                schema: v.object({
                                    message: v.string(),
                                }),
                                data: {
                                    message: "Internal error",
                                },
                            })
                        }
                        return response({
                            context: c,
                            statusCode: error.statusCode,
                            schema: v.object({
                                message: v.string(),
                                cause: v.optional(v.string()),
                            }),
                            data: {
                                message: error.externalMessage ?? "Internal error",
                                cause: typeof error.cause === "string" ? error.cause : undefined,
                            },
                        })
                    }
                    if (error instanceof pg.PostgresError) {
                        apiLog({
                            var: c.var,
                            type: "error",
                            internalMessage: error.message,
                            cause: String(error.cause),
                            stack: error.stack,
                        })
                        return response({
                            context: c,
                            statusCode: 500,
                            schema: v.object({
                                message: v.string(),
                            }),
                            data: {
                                message: "Internal error",
                            },
                        })
                    }
                    apiLog({
                        var: c.var,
                        type: "error",
                        internalMessage: error.message,
                        cause: String(error.cause),
                        stack: error.stack,
                    })
                    return response({
                        context: c,
                        statusCode: 500,
                        schema: v.object({
                            message: v.string(),
                        }),
                        data: {
                            errorCode: "SERVER_ERROR",
                            message: "Internal error",
                        },
                    })
                } catch (innerError) {
                    console.error("[errorHandler] Failed to produce error response:", innerError, {
                        originalError: error,
                    })
                    return c.json(
                        {
                            message: "Internal error",
                            cause: String(innerError),
                        },
                        error instanceof Exception ? error.statusCode : 500,
                    )
                }
            })

            .all("/", (c) => {
                return response({
                    context: c,
                    statusCode: 200,
                    schema: v.object({
                        state: v.boolean(),
                        message: v.string(),
                    }),
                    data: {
                        state: true,
                        message: "Server is running",
                    },
                })
            })

            .route("/", routes)

            .notFound((c) => {
                return response({
                    context: c,
                    statusCode: 404,
                    schema: v.object({
                        message: v.string(),
                    }),
                    data: {
                        message: "Endpoint not found",
                    },
                })
            })

        return api
    } catch (error: unknown) {
        throw new Error("Failed to create api", {
            cause: error,
        })
    }
}
