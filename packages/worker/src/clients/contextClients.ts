import { aiClient } from "#src/clients/aiClient.js"
import { qdrantClient } from "#src/clients/qdrantClient.js"
import { queueClient } from "#src/clients/queueClient.js"
import { redisClient } from "#src/clients/redisClient.js"
import { sqlClient } from "#src/clients/sqlClient.js"
import { storageClient } from "#src/clients/storageClient.js"

export class ContextClients {
    static ai: ReturnType<typeof aiClient>
    static qdrant: ReturnType<typeof qdrantClient>
    static queue: ReturnType<typeof queueClient>
    static redis: Awaited<ReturnType<typeof redisClient>>
    static storage: ReturnType<typeof storageClient>
    static sql: ReturnType<typeof sqlClient>

    static async init() {
        ContextClients.ai = aiClient()
        ContextClients.qdrant = qdrantClient()
        ContextClients.queue = queueClient()
        ContextClients.redis = await redisClient()
        ContextClients.storage = storageClient()
        ContextClients.sql = sqlClient()
    }
}
