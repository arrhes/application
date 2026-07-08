import { Redis } from "ioredis"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { Exception } from "#src/utilities/exception.js"

export async function redisClient() {
    try {
        const redisClient = new Redis(ContextEnv.REDIS_URL_WRITE ?? ContextEnv.REDIS_URL)
        await redisClient.ping()

        return redisClient
    } catch (error) {
        throw new Exception({
            internalMessage: "Redis client not available",
            rawError: error,
        })
    }
}
