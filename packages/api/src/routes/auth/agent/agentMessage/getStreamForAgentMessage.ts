import { getStreamForAgentMessageRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { streamText } from "hono/streaming"
import { checkAuthMiddleware } from "../../../../middlewares/checkAuthMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { Exception } from "../../../../utilities/exception.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"

const STREAM_FIRST_ACTIVITY_TIMEOUT_MS = 10_000
const STREAM_UNAVAILABLE_MESSAGE = "La diffusion de la réponse a expiré. Veuillez renvoyer votre message."

export const getStreamForAgentMessageRoute = apiFactory
    .createApp()
    .use(async (c, next) => {
        c.header("Content-Type", "text/event-stream")
        c.header("Cache-Control", "no-cache")
        c.header("Connection", "keep-alive")
        await next()
    })
    .post(getStreamForAgentMessageRouteDefinition.path, async (c) => {
        await checkAuthMiddleware({
            context: c,
        })
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
                if (agentMessage.output) {
                    await stream.write(
                        `data: ${JSON.stringify({
                            type: "TEXT_MESSAGE_CONTENT",
                            delta: agentMessage.output,
                        })}\n\n`,
                    )
                }
            })
        }

        if (agentMessage.state === "error") {
            return streamText(c, async (stream) => {
                await stream.write(
                    `data: ${JSON.stringify({
                        type: "TEXT_MESSAGE_CONTENT",
                        delta: agentMessage.output ?? "Une erreur est survenue lors de la génération de la réponse.",
                    })}\n\n`,
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

        const failStreamImmediately = async (internalMessage: string): Promise<never> => {
            await c.var.clients.sql
                .update(models.agentMessage)
                .set({
                    state: "error",
                    output: STREAM_UNAVAILABLE_MESSAGE,
                })
                .where(and(eq(models.agentMessage.id, body.idAgentMessage), eq(models.agentMessage.state, "streaming")))

            throw new Exception({
                statusCode: 410,
                internalMessage,
                externalMessage: STREAM_UNAVAILABLE_MESSAGE,
            })
        }

        // Fast-fail check: queue is the source of truth for pending/running jobs.
        const queuedJob = await c.var.clients.queue.getJob(body.idAgentMessage)
        if (queuedJob === null) {
            const freshMessage = await selectOne({
                database: c.var.clients.sql,
                table: models.agentMessage,
                where: (table) => and(eq(table.id, body.idAgentMessage)),
            })
            if (freshMessage.state === "streaming") {
                await failStreamImmediately(`Queue job missing for agent message ${body.idAgentMessage}`)
            }
        }

        // Preflight: wait for first Redis activity for at most 10s.
        // If nothing arrives and DB state is still streaming, convert the message to error
        // and return an HTTP error instead of keeping the frontend in an infinite loader.
        const preflightSubscriber = c.var.clients.redis.duplicate()
        let preflightClosed = false

        const cleanupPreflight = async () => {
            if (preflightClosed) return
            preflightClosed = true
            try {
                preflightSubscriber.unsubscribe(streamKey)
                preflightSubscriber.disconnect()
            } catch {
                // ignore cleanup errors
            }
        }

        await preflightSubscriber.subscribe(streamKey)

        const firstActivityPromise = new Promise<"message" | "error" | "timeout">((resolve) => {
            const timeoutId = setTimeout(() => resolve("timeout"), STREAM_FIRST_ACTIVITY_TIMEOUT_MS)

            preflightSubscriber.once("message", (channel) => {
                if (channel !== streamKey) return
                clearTimeout(timeoutId)
                resolve("message")
            })

            preflightSubscriber.once("error", () => {
                clearTimeout(timeoutId)
                resolve("error")
            })
        })

        const firstActivity = await firstActivityPromise
        await cleanupPreflight()

        if (firstActivity === "timeout" || firstActivity === "error") {
            const freshMessage = await selectOne({
                database: c.var.clients.sql,
                table: models.agentMessage,
                where: (table) => and(eq(table.id, body.idAgentMessage)),
            })

            // Worker may have completed between timeout and DB recheck.
            if (freshMessage.state === "completed") {
                return streamText(c, async (stream) => {
                    if (freshMessage.output) {
                        await stream.write(
                            `data: ${JSON.stringify({
                                type: "TEXT_MESSAGE_CONTENT",
                                delta: freshMessage.output,
                            })}\n\n`,
                        )
                    }
                    if (freshMessage.toolCalls && Array.isArray(freshMessage.toolCalls)) {
                        for (const tc of freshMessage.toolCalls) {
                            await stream.write(`data: ${JSON.stringify(tc)}\n\n`)
                        }
                    }
                })
            }

            if (freshMessage.state === "error") {
                return streamText(c, async (stream) => {
                    await stream.write(
                        `data: ${JSON.stringify({
                            type: "TEXT_MESSAGE_CONTENT",
                            delta:
                                freshMessage.output ?? "Une erreur est survenue lors de la génération de la réponse.",
                        })}\n\n`,
                    )
                })
            }

            await failStreamImmediately(`Stream unavailable for agent message ${body.idAgentMessage}`)
        }

        return streamText(c, async (stream) => {
            // Create a dedicated Redis client for this subscription
            // (pub/sub requires a dedicated connection — the shared client cannot be used)
            const subscriberRedis = c.var.clients.redis.duplicate()
            let closed = false
            // Track how much content the worker has streamed so far via Redis
            // so we can skip deltas already covered by the DB checkpoint.
            let redisContentLength = 0
            let checkpointContentLength = 0
            let checkpointSent = false

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

                    try {
                        // Skip TEXT_MESSAGE_CONTENT deltas already covered by checkpoint
                        if (checkpointSent && checkpointContentLength > 0) {
                            const parsed = JSON.parse(message) as Record<string, unknown>
                            if (parsed.type === "TEXT_MESSAGE_CONTENT" && typeof parsed.delta === "string") {
                                redisContentLength += parsed.delta.length
                                if (redisContentLength <= checkpointContentLength) {
                                    return // Already covered
                                }
                                // Partial overlap: trim the delta
                                const alreadyCovered =
                                    checkpointContentLength - (redisContentLength - parsed.delta.length)
                                if (alreadyCovered > 0) {
                                    parsed.delta = parsed.delta.slice(alreadyCovered)
                                    await stream.write(`data: ${JSON.stringify(parsed)}\n\n`)
                                    return
                                }
                            }
                        }
                        // Forward the AG-UI event as an SSE data line
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
                if (freshMessage.output) {
                    await stream.write(
                        `data: ${JSON.stringify({
                            type: "TEXT_MESSAGE_CONTENT",
                            delta: freshMessage.output,
                        })}\n\n`,
                    )
                }
                if (freshMessage.toolCalls && Array.isArray(freshMessage.toolCalls)) {
                    for (const tc of freshMessage.toolCalls) {
                        await stream.write(`data: ${JSON.stringify(tc)}\n\n`)
                    }
                }
                await cleanup()
                return
            }

            // Send any partial content already checkpointed to DB
            // so the client can display it immediately on reconnect
            if (freshMessage.output) {
                checkpointContentLength = freshMessage.output.length
                await stream.write(
                    `data: ${JSON.stringify({
                        type: "TEXT_MESSAGE_CONTENT",
                        delta: freshMessage.output,
                    })}\n\n`,
                )
            }
            if (freshMessage.toolCalls && Array.isArray(freshMessage.toolCalls)) {
                for (const tc of freshMessage.toolCalls) {
                    await stream.write(`data: ${JSON.stringify(tc)}\n\n`)
                }
            }
            checkpointSent = true

            await streamPromise
        })
    })
