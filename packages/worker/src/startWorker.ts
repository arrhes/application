import { ContextClients } from "#src/clients/contextClients.js"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { processJobs } from "#src/utilities/queue/processJobs.js"

export async function startWorker() {
    while (true) {
        try {
            // Get variables and clients
            await ContextEnv.init()
            await ContextClients.init()

            console.log("Starting worker...")
            // await recoverStuckJobs()
            await processJobs()

            // Wait indefinitely (prevents loop from restarting immediately)
            await new Promise(() => {})
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(
                    JSON.stringify(
                        {
                            type: "error",
                            message: error.message,
                            cause: error.cause,
                        },
                        undefined,
                        2,
                    ),
                )
            }
            console.error(
                JSON.stringify(
                    {
                        type: "error",
                        message: "Unknown error",
                        cause: error,
                    },
                    undefined,
                    2,
                ),
            )

            console.error("Restarting in 3 seconds...")
            await new Promise((resolve) => setTimeout(resolve, 3000))
        }
    }
}
