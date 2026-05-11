import type { StreamChunk, TextOptions, Tool } from "@tanstack/ai"
import { EventType } from "@tanstack/ai"
import type { StructuredOutputOptions, StructuredOutputResult } from "@tanstack/ai/adapters"
import { BaseTextAdapter } from "@tanstack/ai/adapters"
import OpenAI from "openai"

const MAX_RETRIES = 5
const BASE_DELAY_MS = 2000
const MIN_CALL_INTERVAL_MS = 500

let lastApiCallTimestamp = 0

function getRetryDelay(error: unknown, attempt: number): number {
    if (error && typeof error === "object" && "headers" in error) {
        const headers = (
            error as {
                headers?: Headers
            }
        ).headers
        const retryAfter = headers?.get?.("retry-after")
        if (retryAfter) {
            const seconds = Number.parseFloat(retryAfter)
            if (!Number.isNaN(seconds) && seconds > 0) return Math.min(seconds * 1000, 30_000)
        }
    }
    return BASE_DELAY_MS * 2 ** attempt
}

function isRateLimitError(error: unknown): boolean {
    if (error && typeof error === "object" && "status" in error)
        return (
            (
                error as {
                    status: number
                }
            ).status === 429
        )
    if (error instanceof Error && error.message.includes("429")) return true
    return false
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function throttle(): Promise<void> {
    const now = Date.now()
    const elapsed = now - lastApiCallTimestamp
    if (elapsed < MIN_CALL_INTERVAL_MS) await sleep(MIN_CALL_INTERVAL_MS - elapsed)
    lastApiCallTimestamp = Date.now()
}

export class MistralChatAdapter extends BaseTextAdapter<
    string,
    Record<string, any>,
    readonly [
        "text",
    ],
    {
        text: unknown
        image: unknown
        audio: unknown
        video: unknown
        document: unknown
    }
> {
    readonly kind = "text" as const
    readonly name = "mistral" as const
    private client: OpenAI

    constructor(
        model: string,
        options: {
            apiKey: string
            baseURL: string
        },
    ) {
        super({}, model)
        this.client = new OpenAI({
            apiKey: options.apiKey,
            baseURL: options.baseURL,
        })
    }

    async *chatStream(options: TextOptions): AsyncIterable<StreamChunk> {
        const timestamp = Date.now()
        const runId = `run_${Date.now()}`
        const threadId = `thread_${Date.now()}`
        const messageId = `msg_${Date.now()}`
        let hasEmittedRunStarted = false
        let hasEmittedTextMessageStart = false
        let accumulatedContent = ""
        const toolCallsAccumulated = new Map<
            number,
            {
                id: string
                name: string
                arguments: string
                started: boolean
            }
        >()
        const messages = this.formatMessages(options)
        const tools = options.tools ? this.formatTools(options.tools) : undefined

        try {
            let stream: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk> | undefined
            for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
                try {
                    await throttle()
                    stream = await this.client.chat.completions.create({
                        model: options.model,
                        messages,
                        tools: tools && tools.length > 0 ? tools : undefined,
                        temperature: options.temperature,
                        max_tokens: options.maxTokens,
                        top_p: options.topP,
                        stream: true,
                    })
                    break
                } catch (retryError: unknown) {
                    if (isRateLimitError(retryError) && attempt < MAX_RETRIES) {
                        const delay = getRetryDelay(retryError, attempt)
                        console.warn(
                            `[MistralChatAdapter] Rate limited, retrying in ${delay}ms (${attempt + 1}/${MAX_RETRIES})`,
                        )
                        await sleep(delay)
                        continue
                    }
                    throw retryError
                }
            }
            if (!stream) throw new Error("Failed to create chat completion stream after retries")

            for await (const chunk of stream) {
                const choice = chunk.choices?.[0]
                if (!choice) continue

                if (!hasEmittedRunStarted) {
                    hasEmittedRunStarted = true
                    yield {
                        type: EventType.RUN_STARTED,
                        threadId,
                        runId,
                        model: chunk.model || options.model,
                        timestamp,
                    }
                }

                const delta = choice.delta
                if (delta?.content) {
                    if (!hasEmittedTextMessageStart) {
                        hasEmittedTextMessageStart = true
                        yield {
                            type: EventType.TEXT_MESSAGE_START,
                            messageId,
                            model: chunk.model || options.model,
                            timestamp,
                            role: "assistant",
                        }
                    }
                    accumulatedContent += delta.content
                    yield {
                        type: EventType.TEXT_MESSAGE_CONTENT,
                        messageId,
                        model: chunk.model || options.model,
                        timestamp,
                        delta: delta.content,
                        content: accumulatedContent,
                    }
                }

                if (delta?.tool_calls) {
                    for (const toolCallDelta of delta.tool_calls) {
                        const idx = toolCallDelta.index
                        if (!toolCallsAccumulated.has(idx)) {
                            toolCallsAccumulated.set(idx, {
                                id: toolCallDelta.id ?? `call_${idx}_${Date.now()}`,
                                name: toolCallDelta.function?.name ?? "",
                                arguments: "",
                                started: false,
                            })
                        }
                        const tc = toolCallsAccumulated.get(idx)!
                        if (toolCallDelta.id) tc.id = toolCallDelta.id
                        if (toolCallDelta.function?.name) tc.name = toolCallDelta.function.name
                        if (toolCallDelta.function?.arguments) tc.arguments += toolCallDelta.function.arguments
                        if (!tc.started && tc.name) {
                            tc.started = true
                            yield {
                                type: EventType.TOOL_CALL_START,
                                toolCallId: tc.id,
                                toolName: tc.name,
                                toolCallName: tc.name,
                                parentMessageId: messageId,
                                model: chunk.model || options.model,
                                timestamp,
                                index: idx,
                            }
                        }
                        if (toolCallDelta.function?.arguments) {
                            yield {
                                type: EventType.TOOL_CALL_ARGS,
                                toolCallId: tc.id,
                                model: chunk.model || options.model,
                                timestamp,
                                delta: toolCallDelta.function.arguments,
                            }
                        }
                    }
                }

                if (choice.finish_reason) {
                    for (const [, tc] of toolCallsAccumulated) {
                        let parsedInput: unknown = {}
                        try {
                            parsedInput = tc.arguments ? JSON.parse(tc.arguments) : {}
                        } catch {
                            parsedInput = {}
                        }
                        yield {
                            type: EventType.TOOL_CALL_END,
                            toolCallId: tc.id,
                            toolName: tc.name,
                            model: chunk.model || options.model,
                            timestamp,
                            input: parsedInput,
                        }
                    }
                    if (hasEmittedTextMessageStart) {
                        yield {
                            type: EventType.TEXT_MESSAGE_END,
                            messageId,
                            model: chunk.model || options.model,
                            timestamp,
                        }
                    }
                    yield {
                        type: EventType.RUN_FINISHED,
                        threadId,
                        runId,
                        model: chunk.model || options.model,
                        timestamp,
                        finishReason: choice.finish_reason === "tool_calls" ? "tool_calls" : "stop",
                        usage: chunk.usage
                            ? {
                                  promptTokens: chunk.usage.prompt_tokens || 0,
                                  completionTokens: chunk.usage.completion_tokens || 0,
                                  totalTokens: chunk.usage.total_tokens || 0,
                              }
                            : undefined,
                    }
                }
            }
        } catch (error: unknown) {
            const err = error as Error
            yield {
                type: EventType.RUN_ERROR,
                threadId,
                runId,
                model: options.model,
                timestamp,
                message: err.message || "Unknown error",
                error: {
                    message: err.message || "Unknown error",
                },
            }
        }
    }

    async structuredOutput(
        options: StructuredOutputOptions<Record<string, any>>,
    ): Promise<StructuredOutputResult<unknown>> {
        const { chatOptions, outputSchema } = options
        const messages = this.formatMessages(chatOptions)
        let response: OpenAI.Chat.Completions.ChatCompletion | undefined
        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
            try {
                await throttle()
                response = await this.client.chat.completions.create({
                    model: chatOptions.model,
                    messages,
                    temperature: chatOptions.temperature,
                    max_tokens: chatOptions.maxTokens,
                    top_p: chatOptions.topP,
                    response_format: {
                        type: "json_schema" as any,
                        json_schema: {
                            name: "structured_output",
                            schema: outputSchema,
                            strict: true,
                        },
                    } as any,
                    stream: false,
                })
                break
            } catch (retryError: unknown) {
                if (isRateLimitError(retryError) && attempt < MAX_RETRIES) {
                    await sleep(getRetryDelay(retryError, attempt))
                    continue
                }
                throw retryError
            }
        }
        if (!response) throw new Error("Failed to create structured output after retries")
        const rawText = response.choices[0]?.message?.content ?? ""
        let parsed: unknown
        try {
            parsed = JSON.parse(rawText)
        } catch {
            throw new Error(`Failed to parse structured output: ${rawText.slice(0, 200)}`)
        }
        return {
            data: parsed,
            rawText,
        }
    }

    private formatMessages(options: TextOptions): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
        const result: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = []
        if (options.systemPrompts?.length)
            result.push({
                role: "system",
                content: options.systemPrompts.join("\n"),
            })
        for (const msg of options.messages) {
            if (msg.role === "user") {
                result.push({
                    role: "user",
                    content: typeof msg.content === "string" ? msg.content : this.extractText(msg.content),
                })
            } else if (msg.role === "assistant") {
                const text = typeof msg.content === "string" ? msg.content : this.extractText(msg.content)
                const toolCalls = msg.toolCalls?.map((tc) => ({
                    id: tc.id,
                    type: "function" as const,
                    function: {
                        name: tc.function.name,
                        arguments:
                            typeof tc.function.arguments === "string"
                                ? tc.function.arguments
                                : JSON.stringify(tc.function.arguments),
                    },
                }))
                result.push({
                    role: "assistant",
                    content: text || null,
                    ...(toolCalls?.length
                        ? {
                              tool_calls: toolCalls,
                          }
                        : {}),
                })
            } else if (msg.role === "tool") {
                result.push({
                    role: "tool",
                    tool_call_id: msg.toolCallId || "",
                    content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content),
                })
            }
        }
        return result
    }

    private extractText(content: unknown): string {
        if (content === null || content === undefined) return ""
        if (typeof content === "string") return content
        if (Array.isArray(content))
            return content
                .filter((p: any) => p?.type === "text")
                .map((p: any) => p.content || "")
                .join("")
        return ""
    }

    private formatTools(tools: Tool[]): OpenAI.Chat.Completions.ChatCompletionTool[] {
        return tools.map((tool) => ({
            type: "function" as const,
            function: {
                name: tool.name,
                description: tool.description ?? "",
                parameters: (tool.inputSchema ?? {
                    type: "object",
                    properties: {},
                    required: [],
                }) as any,
            },
        }))
    }
}

export function createMistralChat(
    model: string,
    options: {
        apiKey: string
        baseURL: string
    },
): MistralChatAdapter {
    return new MistralChatAdapter(model, options)
}
