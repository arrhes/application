import { createServer } from "node:http"
import { api } from "./api.js"
import { getClients } from "./utilities/getClients.js"
import { getEnv } from "./utilities/getEnv.js"
import { ensureStorageBucket } from "./utilities/storage/ensureStorageBucket.js"

async function startServer() {
    process.on("uncaughtException", (error) => {
        console.error("Uncaught Exception:", error)
        // Handle logic to alert you or log the error
        // Possibly shutdown the server gracefully or restart
    })

    process.on("unhandledRejection", (reason) => {
        console.error("Unhandled Rejection:", reason)
        // Similar to uncaughtException handling
    })
    while (true) {
        try {
            // Get variables and clients
            const env = getEnv()
            const clients = await getClients(env)

            // Ensure the storage bucket exists (creates it on first run)
            await ensureStorageBucket(clients.storage, env.STORAGE_BUCKET_NAME)

            const app = await api({
                env: env,
                clients: clients,
            })

            // Setup the server and connect to Hono app
            const server = createServer(async (req, res) => {
                const { method } = req
                const url = `https://${req.headers.host}${req.url}`

                const body = method === "GET" || method === "HEAD" ? undefined : (req as any) // Node streams are not fully typed

                const request = await Promise.resolve(
                    new Request(url, {
                        method: method,
                        headers: req.headers as Record<string, string>,
                        body: body,
                        // @ts-expect-error
                        duplex: "half",
                    }),
                )

                if (app === undefined) throw new Error("Failed to create app")
                const response = await app.fetch(request)

                res.writeHead(response.status, {
                    ...Object.fromEntries(response.headers),
                    "Set-Cookie": response.headers.getSetCookie(),
                })

                if (response.body) {
                    const reader = response.body.getReader()
                    async function pump() {
                        while (true) {
                            const { done, value } = await reader.read()
                            if (done) {
                                res.end()
                                break
                            }
                            res.write(Buffer.from(value))
                        }
                    }

                    pump()
                } else {
                    res.end()
                }
            })

            // Start the server
            server.listen(Number(env.PORT), () => {
                console.info(`Server running on http://localhost:${env.PORT}`)
            })

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

await startServer()
