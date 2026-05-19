import type { Handler } from "hono"
import { type ApiEnv, apiFactory } from "./apiFactory.js"

type RouteDefinitionRef = {
    method: "GET" | "POST" | "PATCH" | "DELETE"
    path: string
}

/**
 * Creates a Hono app with a single route registered using the HTTP method
 * and path from the routeDefinition. Use this in handler files instead of
 * `apiFactory.createApp().post(...)` so routes respect their declared method.
 */
export function registerRoute(
    routeDef: RouteDefinitionRef,
    handler: Handler<ApiEnv>,
): ReturnType<typeof apiFactory.createApp> {
    const app = apiFactory.createApp()
    const method = routeDef.method.toLowerCase() as "get" | "post" | "patch" | "delete"
    app[method](routeDef.path, handler)
    return app
}
