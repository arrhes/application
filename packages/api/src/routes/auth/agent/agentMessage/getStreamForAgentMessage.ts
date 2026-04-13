import { models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { streamText } from "hono/streaming"
import { getStreamForAgentMessageRouteDefinition } from "../../../../../../metadata/src/routes/dashboard/auth/agent/agentMessage/getStreamForAgentMessage.js"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { Exception } from "../../../../utilities/exception.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"

export const getStreamForAgentMessageRoute = apiFactory
    .createApp()
    .use(async (c, next) => {
        c.header("Content-Type", "text/event-stream")
        c.header("Cache-Control", "no-cache")
        c.header("Connection", "keep-alive")
        await next()
    })
    .post(getStreamForAgentMessageRouteDefinition.path, async (c) => {
        await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: getStreamForAgentMessageRouteDefinition.schemas.body,
        })

        const agentMessage = await selectOne({
            database: c.var.clients.sql,
            table: models.agentMessage,
            where: (table) => and(eq(table.id, body.idAgentMessage)),
        })

        // If the message is already completed (worker finished before SSE connected),
        // return the content directly
        if (agentMessage.state === "completed") {
            return streamText(c, async (stream) => {
                if (agentMessage.content) {
                    await stream.write(
                        `data: ${JSON.stringify({ type: "TEXT_MESSAGE_CONTENT", delta: agentMessage.content })}\n\n`,
                    )
                }
            })
        }

        if (agentMessage.state === "error") {
            return streamText(c, async (stream) => {
                await stream.write(
                    `data: ${JSON.stringify({ type: "TEXT_MESSAGE_CONTENT", delta: "Une erreur est survenue lors de la génération de la réponse." })}\n\n`,
                )
            })
        }

        const streamKey = agentMessage.streamKey
        if (streamKey === null) {
            throw new Exception({
                statusCode: 500,
                internalMessage: "Agent message has no stream key",
                externalMessage: "Erreur interne",
            })
        }

        return streamText(c, async (stream) => {
            // Create a dedicated Redis client for this subscription
            // (pub/sub requires a dedicated connection — the shared client cannot be used)
            const subscriberRedis = c.var.clients.redis.duplicate()
            let closed = false

            const cleanup = async () => {
                if (closed) return
                closed = true
                try {
                    subscriberRedis.unsubscribe(streamKey)
                    subscriberRedis.disconnect()
                } catch {
                    // ignore cleanup errors
                }
            }

            // Handle client disconnect
            stream.onAbort(cleanup)

            await subscriberRedis.subscribe(streamKey)

            // Register the message handler BEFORE the race-condition DB check
            // so no messages are lost between subscribe and handler registration
            const streamPromise = new Promise<void>((resolve) => {
                subscriberRedis.on("message", async (channel, message) => {
                    if (channel !== streamKey) return

                    if (message === `${streamKey}:close`) {
                        await cleanup()
                        resolve()
                        return
                    }

                    // Forward the AG-UI event as an SSE data line
                    try {
                        await stream.write(`data: ${message}\n\n`)
                    } catch {
                        // Client disconnected mid-stream
                        await cleanup()
                        resolve()
                    }
                })

                subscriberRedis.on("error", async () => {
                    await cleanup()
                    resolve()
                })
            })

            // Race-condition guard: re-check message state after subscribing.
            // If the worker finished before we subscribed, the close sentinel was lost.
            const freshMessage = await selectOne({
                database: c.var.clients.sql,
                table: models.agentMessage,
                where: (table) => and(eq(table.id, body.idAgentMessage)),
            })
            if (freshMessage.state !== "streaming") {
                // Worker already finished — send the completed content and close
                if (freshMessage.content) {
                    await stream.write(
                        `data: ${JSON.stringify({ type: "TEXT_MESSAGE_CONTENT", delta: freshMessage.content })}\n\n`,
                    )
                }
                await cleanup()
                return
            }

            await streamPromise
        })
    })
