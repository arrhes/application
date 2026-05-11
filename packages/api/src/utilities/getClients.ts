import { emailClient } from "../clients/emailClient.js"
import { mollieClient } from "../clients/mollieClient.js"
import { queueClient } from "../clients/queueClient.js"
import { redisClient } from "../clients/redisClient.js"
import { sqlClient } from "../clients/sqlClient.js"
import { storageClient } from "../clients/storageClient.js"
import type { getEnv } from "./getEnv.js"

export async function getClients(env: ReturnType<typeof getEnv>) {
    return {
        sql: sqlClient(env),
        storage: storageClient(env),
        email: emailClient(env),
        mollie: mollieClient(env),
        redis: redisClient(env),
        queue: queueClient(env),
    }
}
