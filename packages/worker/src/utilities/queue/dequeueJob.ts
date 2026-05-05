import { ContextClients } from "#src/clients/contextClients.js"

export async function dequeueJob(parameters: { id: string }) {
    try {
        const currentJob = await ContextClients.queue.getJob(parameters.id)
        if (currentJob !== null) {
            await currentJob.remove()
        }

        return
    } catch (error: unknown) {
        console.log(error)
        return
    }
}
