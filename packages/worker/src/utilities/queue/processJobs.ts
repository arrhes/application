import * as v from "valibot"
import { ContextClients } from "#src/clients/contextClients.js"
import { cleanupOrphanedStorageFiles } from "#src/jobs/cleanupOrphanedStorageFiles/cleanupOrphanedStorageFiles.js"
import { generateMonthlyInvoices } from "#src/jobs/generateMonthlyInvoices/generateMonthlyInvoices.js"
import { runAgentSession } from "#src/jobs/runAgentSession/runAgentSession.js"
import { Exception } from "#src/utilities/exception.js"
import { validate } from "#src/utilities/validate.js"

export const jobSchema = v.object({
    fn: v.string(),
    args: v.array(v.unknown()),
})

export const fnMap: Record<string, (...args: any[]) => Promise<unknown> | unknown> = {
    cleanupOrphanedStorageFiles: cleanupOrphanedStorageFiles,
    generateMonthlyInvoices: generateMonthlyInvoices,
    runAgentSession: runAgentSession,
}

export async function processJobs() {
    try {
        console.log("Job counts:", await ContextClients.queue.getJobCounts())
        ContextClients.queue.process(10, async (job) => {
            try {
                console.log(`[processJobs] Processing job: (${await job.getState()}) ${job.id}`)
                const validatedJob = validate({
                    schema: jobSchema,
                    data: job.data,
                })

                const fnImpl = fnMap[validatedJob.fn]
                if (!fnImpl) {
                    throw new Exception({
                        internalMessage: `Error processing job`,
                        cause: `Unknown function: ${validatedJob.fn}`,
                    })
                }

                await fnImpl(...validatedJob.args)

                return {}
            } catch (error: unknown) {
                throw new Exception({
                    internalMessage: "Error processing job",
                    rawError: error,
                })
            }
        })
    } catch (error: unknown) {
        console.log(error)
    }
}
