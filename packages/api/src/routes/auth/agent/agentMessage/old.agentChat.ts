import { generateId, models, routePath } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import * as v from "valibot"
import { checkOrganizationSubscriptionSessionMiddleware } from "../../../../middlewares/checkOrganizationSubscriptionSessionMiddleware.js"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"
import { validate } from "../../../../utilities/validate.js"

/**
 * TanStack AI's fetchServerSentEvents sends:
 * {
 *   messages: UIMessage[] (with parts, not content),
 *   data: { idOrganization, idYear, idAgentSession?, conversationId }
 * }
 */
const chatBodySchema = v.object({
    messages: v.array(
        v.object({
            id: v.string(),
            role: v.picklist(["user", "assistant", "system"]),
            parts: v.array(v.any()),
            createdAt: v.optional(v.any()),
        }),
    ),
    data: v.object({
        idOrganization: v.pipe(v.string("Ce champ est requis"), v.minLength(1, "Ce champ est requis")),
        idAgentSession: v.optional(v.nullable(v.string())),
        idYear: v.optional(v.nullable(v.string())),
        yearLabel: v.optional(v.nullable(v.string())),
        customInstructions: v.optional(v.nullable(v.string())),
        conversationId: v.optional(v.nullable(v.string())),
    }),
})

const chatReturnSchema = v.object({
    idAgentSession: v.string(),
    idAgentMessage: v.string(),
})

function extractTextFromParts(parts: unknown[]): string {
    return parts
        .filter((p: any) => p?.type === "text" && typeof p?.content === "string")
        .map((p: any) => p.content)
        .join("")
}

export const agentChatRoute = apiFactory.createApp().post(`${routePath.auth}/agent/chat`, async (c) => {
    const { user } = await checkUserSessionMiddleware({ context: c })

    const rawBody = await c.req.json()
    const body = validate({ schema: chatBodySchema, data: rawBody })

    const { messages } = body
    const { idOrganization } = body.data

    await checkOrganizationSubscriptionSessionMiddleware({ context: c, idOrganization })

    // Create or resume session
    let idAgentSession = body.data.idAgentSession
    if (!idAgentSession) {
        const firstUserMessage = messages.at(-1)
        const userText = firstUserMessage?.role === "user" ? extractTextFromParts(firstUserMessage.parts) : ""
        const title = userText.length > 0 ? userText.slice(0, 128) : null
        const now = new Date().toISOString()
        const session = await insertOne({
            database: c.var.clients.sql,
            table: models.agentSession,
            data: {
                id: generateId(),
                idOrganization,
                idUser: user.id,
                title,
                idYear: body.data.idYear ?? null,
                customInstructions: body.data.customInstructions ?? null,
                createdAt: now,
                lastUpdatedAt: null,
            },
        })
        idAgentSession = session.id
    } else {
        const existing = await c.var.clients.sql
            .select()
            .from(models.agentSession)
            .where(and(eq(models.agentSession.id, idAgentSession), eq(models.agentSession.idUser, user.id)))
            .limit(1)

        if (existing.length === 0) {
            throw new Exception({
                statusCode: 404,
                internalMessage: "Agent session not found",
                externalMessage: "Session introuvable",
            })
        }
    }

    // Persist the user message
    const lastMessage = messages.at(-1)
    if (lastMessage && lastMessage.role === "user") {
        const textContent = extractTextFromParts(lastMessage.parts)
        if (textContent.length > 0) {
            await insertOne({
                database: c.var.clients.sql,
                table: models.agentMessage,
                data: {
                    id: generateId(),
                    idAgentSession,
                    role: "user",
                    content: textContent,
                    toolCalls: null,
                    toolResults: null,
                    usedTools: null,
                    state: "completed",
                    streamKey: null,
                    createdAt: new Date().toISOString(),
                },
            })
        }
    }

    // Create the assistant message placeholder with a streamKey
    const streamKey = generateId()
    const assistantMessage = await insertOne({
        database: c.var.clients.sql,
        table: models.agentMessage,
        data: {
            id: generateId(),
            idAgentSession,
            role: "assistant",
            content: null,
            toolCalls: null,
            toolResults: null,
            usedTools: null,
            state: "streaming",
            streamKey,
            createdAt: new Date().toISOString(),
        },
    })

    // Create the workerJob row
    const workerJob = await insertOne({
        database: c.var.clients.sql,
        table: models.workerJob,
        data: {
            id: generateId(),
            idAgentMessage: assistantMessage.id,
            status: "pending",
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
        },
    })

    // Enqueue the job to Bull
    await c.var.clients.queue.add(
        {
            fn: "runAgentSession",
            args: [{ idAgentMessage: assistantMessage.id, idWorkerJob: workerJob.id }],
        },
        {
            jobId: workerJob.id,
            priority: 1,
        },
    )

    return response({
        context: c,
        statusCode: 200,
        schema: chatReturnSchema,
        data: {
            idAgentSession,
            idAgentMessage: assistantMessage.id,
        },
    })
})
