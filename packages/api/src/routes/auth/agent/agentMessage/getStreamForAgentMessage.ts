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

        // Only stream if the message is still being generated
        if (agentMessage.state !== "streaming") {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Agent message is not in streaming state",
                externalMessage: "Ce message n'est plus en cours de génération",
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
            let closed = false

            const cleanup = async () => {
                if (closed) return
                closed = true
                try {
                    await c.var.clients.redis.unsubscribe(streamKey)
                    c.var.clients.redis.disconnect()
                } catch {
                    // ignore cleanup errors
                }
            }

            // Handle client disconnect
            stream.onAbort(cleanup)

            await c.var.clients.redis.connect()
            await c.var.clients.redis.subscribe(streamKey)

            await new Promise<void>((resolve) => {
                c.var.clients.redis.on("message", async (channel, message) => {
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

                c.var.clients.redis.on("error", async () => {
                    await cleanup()
                    resolve()
                })
            })
        })
    })
