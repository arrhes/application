import { Redis } from "ioredis"
import { Exception } from "../utilities/exception.js"
import type { getEnv } from "../utilities/getEnv.js"

export function redisClient(env: ReturnType<typeof getEnv>) {
    try {
        const client = new Redis({
            host: env.REDIS_HOST,
            port: Number(env.REDIS_PORT),
            username: env.REDIS_USERNAME || undefined,
            password: env.REDIS_PASSWORD || undefined,
            ...(env.ENV === "production"
                ? {
                      tls: {
                          host: env.REDIS_HOST,
                          rejectUnauthorized: false,
                      },
                  }
                : {}),
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
