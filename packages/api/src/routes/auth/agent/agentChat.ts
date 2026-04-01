import { generateId, models, routePath } from "@arrhes/application-metadata"
import { chat, toServerSentEventsResponse } from "@tanstack/ai"
import { and, eq } from "drizzle-orm"
import * as v from "valibot"
import { checkOrganizationSubscriptionSessionMiddleware } from "../../../middlewares/checkOrganizationSubscriptionSessionMiddleware.js"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { executeAgent, persistAssistantMessage, updateAssistantMessage } from "../../../utilities/agent/executor.js"
import { getAdapter } from "../../../utilities/agent/provider.js"
import { classifyIntent } from "../../../utilities/agent/router.js"
import { buildYearDataCache } from "../../../utilities/agent/yearDataCache.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { Exception } from "../../../utilities/exception.js"
import { insertOne } from "../../../utilities/sql/insertOne.js"
import { validate } from "../../../utilities/validate.js"

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
        idAgentSession: v.optional(v.string()),
        idYear: v.optional(v.string()),
        yearLabel: v.optional(v.string()),
        customInstructions: v.optional(v.string()),
        conversationId: v.optional(v.string()),
    }),
})

/**
 * Extract text content from a UIMessage's parts array.
 */
function extractTextFromParts(parts: unknown[]): string {
    return parts
        .filter((p: any) => p?.type === "text" && typeof p?.content === "string")
        .map((p: any) => p.content)
        .join("")
}

export const agentChatRoute = apiFactory.createApp().post(`${routePath.auth}/agent/chat`, async (c) => {
    const { user } = await checkUserSessionMiddleware({ context: c })

    // Parse body (TanStack AI SSE format)
    const rawBody = await c.req.json()
    const body = validate({ schema: chatBodySchema, data: rawBody })

    const { messages } = body
    const { idOrganization } = body.data
    const agentContext = {
        idYear: body.data.idYear,
        yearLabel: body.data.yearLabel,
        customInstructions: body.data.customInstructions,
    }

    // Check premium subscription
    await checkOrganizationSubscriptionSessionMiddleware({
        context: c,
        idOrganization,
    })

    const appFetch = c.var.appFetch
    if (!appFetch) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "appFetch not available on context",
        })
    }

    // Create or resume session
    let idAgentSession = body.data.idAgentSession
    if (!idAgentSession) {
        const now = new Date().toISOString()
        const session = await insertOne({
            database: c.var.clients.sql,
            table: models.agentSession,
            data: {
                id: generateId(),
                idOrganization,
                idUser: user.id,
                title: null,
                createdAt: now,
                lastUpdatedAt: null,
            },
        })
        idAgentSession = session.id
    } else {
        // Verify the session belongs to this user
        const existingSession = await c.var.clients.sql
            .select()
            .from(models.agentSession)
            .where(and(eq(models.agentSession.id, idAgentSession), eq(models.agentSession.idUser, user.id)))
            .limit(1)

        if (existingSession.length === 0) {
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
                    createdAt: new Date().toISOString(),
                },
            })
        }
    }

    // Pass 1: Classify intent (extract simple messages for the router)
    const simpleMessages = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({
            role: m.role as "user" | "assistant",
            content: extractTextFromParts(m.parts),
        }))

    let categoryNames: string[]
    try {
        categoryNames = await classifyIntent({
            messages: simpleMessages,
            env: c.var.env,
        })
    } catch {
        // If the router LLM call fails, fall back to all common categories
        categoryNames = ["years", "entries", "accounts", "journals"]
    }

    // Pass 2: Execute agent with selected tools
    // Pre-fetch year-scoped data if a year is selected (avoids redundant API calls for read_all tools)
    const yearDataCache = agentContext.idYear
        ? await buildYearDataCache({
              appFetch,
              cookieHeader: c.req.header("Cookie") ?? "",
              authorizationHeader: c.req.header("Authorization") ?? "",
              organizationHeader: c.req.header("X-Organization-Id") ?? "",
              idOrganization,
              idYear: agentContext.idYear,
          })
        : undefined

    // Pass UIMessages directly — chat() handles UIMessage→ModelMessage conversion
    const stream = executeAgent({
        messages,
        categoryNames,
        context: c,
        env: c.var.env,
        idOrganization,
        idAgentSession,
        appFetch,
        agentContext,
        yearDataCache,
    })

    // Wrap stream to persist the assistant response and emit session ID
    const userText = lastMessage?.role === "user" ? extractTextFromParts(lastMessage.parts) : ""
    const wrappedStream = wrapStreamWithPersistence({
        stream,
        context: c,
        idAgentSession,
        isNewSession: !body.data.idAgentSession,
        userMessage: userText,
        env: c.var.env,
    })

    // Return SSE response
    return toServerSentEventsResponse(wrappedStream)
})

/**
 * Generate a short title for a new session based on the user's first message.
 * Uses a lightweight LLM call. Falls back to a truncated user message on failure.
 */
async function generateSessionTitle(
    userMessage: string,
    env: ReturnType<typeof import("../../../utilities/getEnv.js").getEnv>,
): Promise<string> {
    const fallback = userMessage.length > 60 ? `${userMessage.slice(0, 57)}...` : userMessage

    try {
        const adapter = getAdapter(env)
        const stream = chat({
            adapter,
            messages: [{ role: "user", content: userMessage }],
            systemPrompts: [
                "Tu génères un titre court (5 mots maximum) pour une conversation. Le titre doit résumer le sujet principal de la question. Réponds UNIQUEMENT avec le titre, sans guillemets, sans ponctuation finale, sans explication.",
            ],
        })

        let title = ""
        for await (const chunk of stream) {
            if (chunk.type === "TEXT_MESSAGE_CONTENT") {
                title += chunk.delta ?? ""
            }
        }

        title = title
            .trim()
            .replace(/^["«]|["»]$/g, "")
            .replace(/\.+$/, "")
            .trim()
        return title.length > 0 && title.length <= 80 ? title : fallback
    } catch {
        return fallback
    }
}

/**
 * Wrap the chat stream to persist assistant messages to the database
 * as they are streamed. Uses AG-UI event types.
 */
async function* wrapStreamWithPersistence(parameters: {
    stream: AsyncIterable<any>
    context: any
    idAgentSession: string
    isNewSession: boolean
    userMessage: string
    env: ReturnType<typeof import("../../../utilities/getEnv.js").getEnv>
}): AsyncIterable<any> {
    // Emit session ID as a CUSTOM AG-UI event so the client can track it
    if (parameters.isNewSession) {
        yield {
            type: "CUSTOM",
            timestamp: Date.now(),
            name: "session-created",
            value: { idAgentSession: parameters.idAgentSession },
        }
    }

    let messageId: string | null = null
    let fullContent = ""
    const toolCalls: unknown[] = []
    const toolResults: unknown[] = []
    const usedToolNames = new Set<string>()
    let streamError: string | null = null

    try {
        for await (const chunk of parameters.stream) {
            // Track text content for persistence (AG-UI event type)
            if (chunk.type === "TEXT_MESSAGE_CONTENT") {
                fullContent += chunk.delta ?? ""

                // Create the message record on first content chunk
                if (!messageId) {
                    messageId = await persistAssistantMessage({
                        context: parameters.context,
                        idAgentSession: parameters.idAgentSession,
                        content: fullContent,
                        state: "streaming",
                    })
                }
            }

            if (chunk.type === "TOOL_CALL_START" || chunk.type === "TOOL_CALL_END") {
                toolCalls.push(chunk)
            }

            if (chunk.type === "TOOL_CALL_START" && chunk.toolName) {
                usedToolNames.add(chunk.toolName as string)
            }

            if (chunk.type === "TOOL_CALL_END" && chunk.result !== undefined) {
                toolResults.push(chunk)
            }

            // Capture RUN_ERROR events from the executor (e.g. LLM 429, timeout)
            if (chunk.type === "RUN_ERROR") {
                streamError = chunk.message ?? "Une erreur inattendue est survenue"
            }

            // Pass through all chunks
            yield chunk
        }

        // Determine final state based on whether an error event was emitted
        const finalState = streamError ? "error" : "completed"
        const finalContent = streamError && !fullContent ? streamError : fullContent

        // Finalize the message
        if (messageId) {
            await updateAssistantMessage({
                context: parameters.context,
                messageId,
                content: finalContent,
                toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
                toolResults: toolResults.length > 0 ? toolResults : undefined,
                usedTools: usedToolNames.size > 0 ? [...usedToolNames] : undefined,
                state: finalState,
            })
        } else if (finalContent.length > 0 || toolCalls.length > 0) {
            // If somehow no messageId was created but we have content or tool calls
            await persistAssistantMessage({
                context: parameters.context,
                idAgentSession: parameters.idAgentSession,
                content: finalContent,
                toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
                toolResults: toolResults.length > 0 ? toolResults : undefined,
                usedTools: usedToolNames.size > 0 ? [...usedToolNames] : undefined,
                state: finalState,
            })
        }

        // Update session lastUpdatedAt
        await parameters.context.var.clients.sql
            .update(models.agentSession)
            .set({ lastUpdatedAt: new Date().toISOString() })
            .where(eq(models.agentSession.id, parameters.idAgentSession))

        // Generate a title for new sessions (fire-and-forget to not block the response)
        if (parameters.isNewSession && parameters.userMessage.length > 0) {
            generateSessionTitle(parameters.userMessage, parameters.env)
                .then(async (title) => {
                    await parameters.context.var.clients.sql
                        .update(models.agentSession)
                        .set({ title })
                        .where(eq(models.agentSession.id, parameters.idAgentSession))
                })
                .catch(() => {
                    // Silently ignore title generation failures — the session will
                    // display without a title and the sidebar falls back to createdAt
                })
        }
    } catch (error) {
        // Mark message as error if we had one
        if (messageId) {
            try {
                await updateAssistantMessage({
                    context: parameters.context,
                    messageId,
                    content: fullContent,
                    state: "error",
                })
            } catch {
                // Ignore persistence errors during error handling
            }
        }

        // Emit a RUN_ERROR event so the frontend can display the error
        const errorMessage = error instanceof Error ? error.message : "Une erreur inattendue est survenue"
        yield {
            type: "RUN_ERROR",
            timestamp: Date.now(),
            message: errorMessage,
        }
    }
}
