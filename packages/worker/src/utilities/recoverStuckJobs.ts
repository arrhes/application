import { ContextClients } from "#src/clients/contextClients.js"

export async function recoverStuckJobs() {
    const cleaned = await ContextClients.queue.clean(30000, "active")
    if (cleaned.length > 0) {
        console.log(`[Recovery] Cleaned ${cleaned.length} stuck active jobs`)
    }

    const failedJobs = await ContextClients.queue.getFailed()
    for (const job of failedJobs) {
        try {
            await job.retry()
            console.log(`[Recovery] Retried failed job ${job.id}`)
        } catch (err) {
            console.error(`[Recovery] Retry failed for job ${job.id}:`, err)
        }
    }

    console.log("[Worker] Recovery complete. Waiting for jobs...")
}
