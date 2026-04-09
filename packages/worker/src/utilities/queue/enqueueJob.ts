import { ContextClients } from "#src/clients/contextClients.js"
import type { RunAgentSessionJob } from "#src/jobs/runAgentSession/runAgentSession.js"

export type Job = RunAgentSessionJob

export async function enqueueJob(parameters: { id: string; job: Job }) {
    const currentJob = await ContextClients.queue.getJob(parameters.id)
    if (currentJob !== null) {
        currentJob.remove()
    }

    // console.log(`queue job : ${parameters.id}`)
    const enqueuedJob = await ContextClients.queue.add(parameters.job, {
        jobId: parameters.id,
        priority: 1,
    })
    console.log(`enqueued job : ${enqueuedJob.id}`)

    return enqueuedJob
}
