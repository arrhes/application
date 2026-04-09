import { Redis } from "ioredis"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { Exception } from "#src/utilities/exception.js"

export async function redisClient() {
    try {
        const redisClient = new Redis({
            host: ContextEnv.REDIS_HOST,
            port: Number(ContextEnv.REDIS_PORT),
            username: ContextEnv.REDIS_USERNAME || undefined,
            password: ContextEnv.REDIS_PASSWORD || undefined,
            ...(ContextEnv.ENV === "production"
                ? { tls: { host: ContextEnv.REDIS_HOST, rejectUnauthorized: false } }
                : {}),
        })
        await redisClient.ping()

        return redisClient
    } catch (error) {
        throw new Exception({
            internalMessage: "Redis client not available",
            rawError: error,
        })
    }
}
