import { sqlClient } from "../clients/sqlClient.js"
import { storageClient } from "../clients/storageClient.js"
import type { getEnv } from "./getEnv.js"

export async function getClients(env: ReturnType<typeof getEnv>) {
    return {
        sql: sqlClient(env),
        storage: storageClient(env),
    }
}
