import { ContextClients } from "#src/clients/contextClients.js"

export async function handleShutdown() {
    console.log("[Worker] Shutting down...")
    await ContextClients.queue.close()
    console.log("[Worker] Queue closed.")
    process.exit(0)
}
