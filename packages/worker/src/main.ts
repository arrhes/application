import { startWorker } from "#src/startWorker.js"
import { handleShutdown } from "#src/utilities/handleShutdown.js"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

process.on("SIGINT", handleShutdown)
process.on("SIGTERM", handleShutdown)

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error)
})

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason)
})

await startWorker()
