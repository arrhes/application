import { queueClient } from "#src/clients/queueClient.js"
import { redisClient } from "#src/clients/redisClient.js"
import { sqlClient } from "#src/clients/sqlClient.js"
import { storageClient } from "#src/clients/storageClient.js"

export const ContextClients = {
    queue: undefined as unknown as ReturnType<typeof queueClient>,
    redis: undefined as unknown as Awaited<ReturnType<typeof redisClient>>,
    storage: undefined as unknown as ReturnType<typeof storageClient>,
    sql: undefined as unknown as ReturnType<typeof sqlClient>,

    async init() {
        ContextClients.queue = queueClient()
        ContextClients.redis = await redisClient()
        ContextClients.storage = storageClient()
        ContextClients.sql = sqlClient()
    },
}
