import Queue from "bull"
import { Exception } from "../utilities/exception.js"
import type { getEnv } from "../utilities/getEnv.js"

export function queueClient(env: ReturnType<typeof getEnv>) {
    try {
        const jobQueue = new Queue("jobs", {
            redis: {
                host: env.REDIS_HOST,
                port: Number(env.REDIS_PORT),
                username: env.REDIS_USERNAME || undefined,
                password: env.REDIS_PASSWORD || undefined,
                ...(env.ENV === "production"
                    ? {
                          tls: { host: env.REDIS_HOST },
                      }
                    : {}),
                keepAlive: 1,
                retryStrategy: (times: number) => Math.min(times * 50, 2000),
            },
            defaultJobOptions: {
                attempts: 3,
                timeout: 180_000,
                backoff: { type: "fixed", delay: 15_000 },
                removeOnComplete: true,
                removeOnFail: true,
            },
            settings: {
                lockDuration: 180_000,
                stalledInterval: 30_000,
                maxStalledCount: 1,
            },
        })
        return jobQueue
    } catch (error) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Queue client not available",
            rawError: error,
        })
    }
}
