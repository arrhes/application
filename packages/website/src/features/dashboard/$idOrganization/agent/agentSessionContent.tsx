import {
    createOneAgentMessageRouteDefinition,
    deleteOneAgentSessionRouteDefinition,
    getStreamForAgentMessageRouteDefinition,
    readAllAgentMessagesRouteDefinition,
    readAllAgentSessionsRouteDefinition,
    readOneAgentSessionRouteDefinition
} from "@arrhes/application-metadata"
import { Button, ButtonPlainContent, CircularLoader, InputTextArea } from "@arrhes/ui"
import { css } from "@arrhes/ui/css"
import { IconSend } from "@tabler/icons-react"
import { useNavigate, useParams } from "@tanstack/react-router"
import { useCallback, useEffect, useRef, useState } from "react"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { dataClient } from "../../../../contexts/data/queryClient.ts"
import { agentSessionRoute } from "../../../../routes/root/dashboard/agent/agentSessionRoute.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"
import { AgentMessage } from "./agentMessage.tsx"


interface MessagePart {
    type: string
    content?: string
    name?: string
    state?: string
    args?: unknown
    result?: unknown
}

interface ChatMessage {
    id: string
    role: "user" | "assistant"
    parts: MessagePart[]
    createdAt?: Date
}

export function AgentSessionContent() {
    const params = useParams({ from: agentSessionRoute.id })

    const [input, setInput] = useState<string | null | undefined>(undefined)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDeleteSession = useCallback(async () => {
        const sessionId = params.idAgentSession
        setIsDeleting(true)
        try {
            await getResponseBodyFromAPI({
                routeDefinition: deleteOneAgentSessionRouteDefinition,
                body: { idAgentSession: sessionId },
            })
            await dataClient.invalidateQueries({
                queryKey: [readAllAgentSessionsRouteDefinition.path],
                exact: false,
            })
            navigate({
                to: "/dashboard/organisations/$idOrganization/agent",
                params: { idOrganization: params.idOrganization },
            })
        } finally {
            setIsDeleting(false)
        }
    }, [navigate, params.idOrganization])


    // ── Streaming state ─────────────────────────────────────────────────────────
    // ID of the assistant message currently being streamed from the worker
    const [streamMessageId, setStreamMessageId] = useState<string | undefined>(undefined)
    const [isSending, setIsSending] = useState(false)
    // Accumulates the text content of the in-progress assistant message
    const [streamingContent, setStreamingContent] = useState<string>("")
    const [isStreaming, setIsStreaming] = useState(false)
    const abortStreamRef = useRef<AbortController | null>(null)

    // Open SSE stream whenever streamMessageId changes
    useEffect(() => {
        if (!streamMessageId) return

        // Abort any previous stream
        abortStreamRef.current?.abort()
        const controller = new AbortController()
        abortStreamRef.current = controller

        setIsStreaming(true)
        setStreamingContent("")

        let accumulated = ""

            ; (async () => {
                try {
                    const response = await fetch(
                        new URL(`${import.meta.env.VITE_API_BASE_URL}${getStreamForAgentMessageRouteDefinition.path}`),
                        {
                            method: "POST",
                            credentials: "include",
                            signal: controller.signal,
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ idAgentMessage: streamMessageId }),
                        })

                    if (!response.ok || !response.body) {
                        setIsStreaming(false)
                        return
                    }

                    const reader = response.body.getReader()
                    const decoder = new TextDecoder()
                    let buffer = ""

                    while (true) {
                        const { done, value } = await reader.read()
                        if (done) break

                        buffer += decoder.decode(value, { stream: true })

                        // SSE: split on double-newline boundaries
                        const parts = buffer.split("\n\n")
                        buffer = parts.pop() ?? ""

                        for (const part of parts) {
                            for (const line of part.split("\n")) {
                                if (!line.startsWith("data: ")) continue
                                const jsonStr = line.slice(6).trim()
                                if (!jsonStr) continue

                                try {
                                    const chunk = JSON.parse(jsonStr)
                                    // Accumulate text deltas
                                    if (chunk.type === "TEXT_MESSAGE_CONTENT" && typeof chunk.delta === "string") {
                                        accumulated += chunk.delta
                                        setStreamingContent(accumulated)
                                    }
                                } catch {
                                    // ignore malformed chunks
                                }
                            }
                        }
                    }
                } catch (err: unknown) {
                    if (err instanceof Error && err.name === "AbortError") return
                    console.error("[stream] error", err)
                } finally {
                    if (!controller.signal.aborted) {
                        // Persist the completed assistant message into the messages list
                        if (accumulated) {
                            const assistantMsg: ChatMessage = {
                                id: streamMessageId,
                                role: "assistant",
                                parts: [{ type: "text", content: accumulated }],
                                createdAt: new Date(),
                            }
                            invalidateData({
                                routeDefinition: readAllAgentMessagesRouteDefinition,
                                body: {
                                    idAgentSession: params.idAgentSession
                                },
                            })
                        }
                        setStreamingContent("")
                        setIsStreaming(false)
                    }
                }
            })()

        return () => {
            controller.abort()
        }
    }, [streamMessageId])

    // ── Send message ────────────────────────────────────────────────────────────
    const sendMessageToWorker = useCallback(
        async (text: string) => {
            if (!text.trim() || isSending) return
            setIsSending(true)

            // Optimistically add the user message
            const tempUserMessage: ChatMessage = {
                id: `temp-user-${Date.now()}`,
                role: "user",
                parts: [{ type: "text", content: text.trim() }],
                createdAt: new Date(),
            }
            invalidateData({
                routeDefinition: readAllAgentMessagesRouteDefinition,
                body: {
                    idAgentSession: params.idAgentSession
                },
            })

            try {
                const result = await getResponseBodyFromAPI({
                    routeDefinition: createOneAgentMessageRouteDefinition,
                    body: {
                        idOrganization: params.idOrganization,
                        idAgentSession: params.idAgentSession,
                        message: text.trim(),
                        // messages: [
                        //     {
                        //         id: tempUserMessage.id,
                        //         role: "user",
                        //         parts: [{ type: "text", content: text.trim() }],
                        //     },
                        // ],
                        // data: {
                        //     idOrganization: params.idOrganization,
                        //     idAgentSession: effectiveSessionId ?? null,
                        //     idYear: selectedYear?.id ?? null,
                        //     yearLabel: selectedYear?.label ?? null,
                        //     customInstructions: customInstructions.trim() || null,
                        // },
                    },
                })

                if (!result.ok || !result.data) {
                    console.error("[sendMessageToWorker] Failed", result.error)
                    return
                }

                const { idAgentSession, id: idAgentMessage } = result.data

                // Trigger SSE stream for this assistant message
                setStreamMessageId(idAgentMessage)
            } finally {
                setIsSending(false)
            }
        },
        [isSending, params.idOrganization, params.idAgentSession],
    )

    const [historyIndex, setHistoryIndex] = useState(-1)

    const isSubmitting = isSending || isStreaming

    return (
        <DataWrapper
            routeDefinition={readOneAgentSessionRouteDefinition}
            body={{
                idAgentSession: params.idAgentSession,
            }}
        >
            {(agentSession) => {
                return (
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            width: "100%",
                        })}
                    >
                        {/* Messages area */}
                        <DataWrapper
                            routeDefinition={readAllAgentMessagesRouteDefinition}
                            body={{ idAgentSession: params.idAgentSession }}
                        >
                            {(agentMessages) => {
                                return (
                                    <div
                                        className={css({
                                            flex: 1,
                                            minHeight: 0,
                                            overflowY: "auto",
                                            padding: "1rem",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "1rem",
                                        })}
                                    >
                                        {agentMessages.map((agentMessage) => (
                                            <AgentMessage
                                                key={agentMessage.id}
                                                agentMessage={agentMessage}
                                            />
                                        ))}

                                        {/* Thinking indicator — waiting for first token */}
                                        {isSending && !isStreaming && (
                                            <div className={css({ padding: "0.5rem" })}>
                                                <CircularLoader text="Réflexion en cours..." />
                                            </div>
                                        )}

                                        <div ref={messagesEndRef} />
                                    </div>
                                )
                            }}
                        </DataWrapper>

                        {/* Input area */}
                        <div
                            className={css({
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "end",
                                gap: "0.5rem",
                                padding: "1rem",
                                borderTop: "1px solid",
                                borderTopColor: "neutral/10",
                                backgroundColor: "white",
                            })}
                        >
                            <InputTextArea
                                value={input}
                                onChange={(value) => setInput(value)}
                                onKeyDown={(e) => {
                                    // if (e.key === "ArrowUp") {
                                    //     // if (userMessageHistory.length === 0) return
                                    //     // const nextIndex = Math.min(historyIndex + 1, userMessageHistory.length - 1)
                                    //     // setHistoryIndex(nextIndex)
                                    //     // setInput(userMessageHistory[nextIndex] ?? "")
                                    //     e.preventDefault()
                                    // } else if (e.key === "ArrowDown") {
                                    //     if (historyIndex <= 0) {
                                    //         setHistoryIndex(-1)
                                    //         setInput("")
                                    //         e.preventDefault()
                                    //         return
                                    //     }
                                    //     const nextIndex = historyIndex - 1
                                    //     setHistoryIndex(nextIndex)
                                    //     // setInput(userMessageHistory[nextIndex] ?? "")
                                    //     e.preventDefault()
                                    // }
                                }}
                                placeholder="Votre message..."
                                disabled={isSubmitting}
                                className={css({ flex: 1 })}
                            />
                            <Button
                                isDisabled={isSubmitting}
                                onClick={(event) => {
                                    event.preventDefault()
                                    if (input === null || input === undefined || input.trim() === "" || isSubmitting) return
                                    sendMessageToWorker(input)
                                    setInput("")
                                    setHistoryIndex(-1)
                                }}
                            >
                                <ButtonPlainContent
                                    isLoading={isSubmitting}
                                    leftIcon={<IconSend />}
                                    text="Envoyer"
                                />
                            </Button>
                        </div>
                    </div >
                )
            }}
        </DataWrapper>
    )
}
