import type { Env } from "hono"
import { createFactory } from "hono/factory"
import type { getClients } from "./getClients.js"
import type { getEnv } from "./getEnv.js"

export type ApiEnv = Env & {
    Variables: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
}

export const apiFactory = createFactory<ApiEnv>({})
