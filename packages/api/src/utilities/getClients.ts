import { emailClient } from "../clients/emailClient.js"
import { mollieClient } from "../clients/mollieClient.js"
import { sqlClient } from "../clients/sqlClient.js"
import { storageClient, storagePublicClient } from "../clients/storageClient.js"
import type { getEnv } from "./getEnv.js"

export async function getClients(env: ReturnType<typeof getEnv>) {
    return {
        sql: sqlClient(env),
        storage: storageClient(env),
        storagePublic: storagePublicClient(env),
        email: emailClient(env),
        mollie: mollieClient(env),
    }
}
