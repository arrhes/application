import Queue from "bull"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { Exception } from "#src/utilities/exception.js"

export function queueClient() {
    try {
        const jobQueue = new Queue("jobs", ContextEnv.REDIS_URL, {
            redis: {
                keepAlive: 1,
                retryStrategy: (times) => Math.min(times * 50, 2000),
            },
            defaultJobOptions: {
                attempts: 3, // Retry up to 3 times
                timeout: 180_000, // Hard kill job if >130s
                backoff: {
                    type: "fixed",
                    delay: 15_000, // Wait 15s between retries
                },
                removeOnComplete: true,
                removeOnFail: true,
            },
            settings: {
                lockDuration: 180_000, // Job is "owned" for 150s max
                stalledInterval: 30_000, // Check every 60s for stuck jobs
                maxStalledCount: 1, // Retry once on stall
            },
        })
        jobQueue.on("error", (error) => {
            throw new Exception({
                internalMessage: "Queue client not available",
                rawError: error,
            })
        })
        return jobQueue
    } catch (error) {
        throw new Exception({
            internalMessage: "Queue client not available",
            rawError: error,
        })
    }
}
