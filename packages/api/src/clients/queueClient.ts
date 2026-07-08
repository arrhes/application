import Queue from "bull"
import { Exception } from "../utilities/exception.js"
import type { getEnv } from "../utilities/getEnv.js"

export function queueClient(env: ReturnType<typeof getEnv>) {
    try {
        const jobQueue = new Queue("jobs", env.REDIS_URL, {
            redis: {
                keepAlive: 1,
                retryStrategy: (times: number) => Math.min(times * 50, 2000),
            },
            defaultJobOptions: {
                attempts: 3,
                timeout: 180_000,
                backoff: {
                    type: "fixed",
                    delay: 15_000,
                },
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
