import type { Context } from "hono"

export function getRemoteAddress(parameters: { context: Context }) {
    const remoteAddress = parameters.context.req.header("X-Forwarded-For")
    return remoteAddress ?? null
}
