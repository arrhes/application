import { Redis } from "ioredis"
import { Exception } from "../utilities/exception.js"
import type { getEnv } from "../utilities/getEnv.js"

export function redisClient(env: ReturnType<typeof getEnv>) {
    try {
        const client = new Redis(env.REDIS_URL_WRITE ?? env.REDIS_URL, {
            lazyConnect: true,
        })
        return client
    } catch (error) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Redis client not available",
            rawError: error,
        })
    }
}
