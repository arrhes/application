import {
    deleteOneAgentSessionRouteDefinition,
    getStreamForAgentMessageRouteDefinition,
    readAllAgentSessionsRouteDefinition,
    readOneAgentSessionRouteDefinition
} from "@arrhes/application-metadata"
import { Button, ButtonPlainContent, CircularLoader, InputTextArea } from "@arrhes/ui"
import { css } from "@arrhes/ui/css"
import { IconCalendar, IconChevronDown, IconChevronRight, IconSend, IconSettings, IconTrash } from "@tabler/icons-react"
import { useNavigate, useParams } from "@tanstack/react-router"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { dataClient } from "../../../../contexts/data/queryClient.ts"
import { agentSessionRoute } from "../../../../routes/root/dashboard/agent/agentSessionRoute.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { useDataFromAPI } from "../../../../utilities/useHTTPData.ts"
import { AgentMessage } from "./agentMessage.tsx"
import { convertStoredMessagesToUIMessages } from "./convertStoredMessagesToUIMessages.ts"


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

export function AgentSessionPage() {
    const params = useParams({ from: agentSessionRoute.id })

    const [input, setInput] = useState<string | null | undefined>(undefined)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const sessionCreatedRef = useRef(false)
    const navigate = useNavigate()
    const [isDeleting, setIsDeleting] = useState(false)

    // Track the effective session ID
    const [effectiveSessionId, setEffectiveSessionId] = useState(params.idAgentSession)

    // Fetch available years
    const { data: agentSessionData } = useDataFromAPI({
        routeDefinition: readOneAgentSessionRouteDefinition,
        body: {
            idAgentSession: params.idAgentSession,
        },
    })


    const selectedYear = agentSessionData?.idYear

    const [customInstructions, setCustomInstructions] = useState("")
    const [contextOpen, setContextOpen] = useState(false)

    // Load existing messages when resuming a session
    const hasPendingMessage = !!pendingMessageRef.current
    const { data: sessionData, isPending: isSessionPending } = useDataFromAPI({
        routeDefinition: readOneAgentSessionRouteDefinition,
        body: { idAgentSession: params.idAgentSession ?? "" },
        enabled: params.idAgentSession !== undefined && params.idAgentSession !== "" && !hasPendingMessage,
    })

    const handleSessionCreated = useCallback(
        (idAgentSession: string) => {
            if (sessionCreatedRef.current) return
            sessionCreatedRef.current = true
            setEffectiveSessionId(idAgentSession)
            dataClient.invalidateQueries({
                queryKey: [readAllAgentSessionsRouteDefinition.path],
                exact: false,
            })
            navigate({
                to: "/dashboard/organisations/$idOrganization/agent/sessions/$idAgentSession",
                params: { idOrganization: params.idOrganization, idAgentSession },
            })
        },
        [navigate, params.idOrganization],
    )

    const handleDeleteSession = useCallback(async () => {
        const sessionId = effectiveSessionId
        if (!sessionId) return
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
            setActiveSessionId(undefined)
            navigate({
                to: "/dashboard/organisations/$idOrganization/agent",
                params: { idOrganization: params.idOrganization },
            })
        } finally {
            setIsDeleting(false)
        }
    }, [effectiveSessionId, navigate, params.idOrganization, setActiveSessionId])

    // ── Message state ───────────────────────────────────────────────────────────
    const [messages, setMessages] = useState<ChatMessage[]>([])

    // Load session messages on resume
    const hasLoadedSessionRef = useRef(false)
    useEffect(() => {
        if (hasLoadedSessionRef.current) return
        if (!sessionData?.messages || sessionData.messages.length === 0) return
        if (messages.length > 0) return
        hasLoadedSessionRef.current = true
        const uiMessages = convertStoredMessagesToUIMessages(sessionData.messages)
        if (uiMessages.length > 0) {
            setMessages(uiMessages as ChatMessage[])
        }
    }, [sessionData, messages.length])

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
                            setMessages((prev) => [...prev, assistantMsg])
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
            setMessages((prev) => [...prev, tempUserMessage])

            try {
                const result = await getResponseBodyFromAPI({
                    routeDefinition: agentChatRouteDefinition,
                    body: {
                        messages: [
                            {
                                id: tempUserMessage.id,
                                role: "user",
                                parts: [{ type: "text", content: text.trim() }],
                            },
                        ],
                        data: {
                            idOrganization: params.idOrganization,
                            idAgentSession: effectiveSessionId ?? null,
                            idYear: selectedYear?.id ?? null,
                            yearLabel: selectedYear?.label ?? null,
                            customInstructions: customInstructions.trim() || null,
                        },
                    },
                })

                if (!result.ok || !result.data) {
                    console.error("[sendMessageToWorker] Failed", result.error)
                    return
                }

                const { idAgentSession, idAgentMessage } = result.data

                if (!effectiveSessionId || effectiveSessionId !== idAgentSession) {
                    handleSessionCreated(idAgentSession)
                }

                // Trigger SSE stream for this assistant message
                setStreamMessageId(idAgentMessage)
            } finally {
                setIsSending(false)
            }
        },
        [isSending, params.idOrganization, effectiveSessionId, selectedYear, customInstructions, handleSessionCreated],
    )

    // Send pending first message on mount
    const hasSentPendingRef = useRef(false)
    useEffect(() => {
        if (hasSentPendingRef.current) return
        if (!pendingMessageRef.current) return
        hasSentPendingRef.current = true
        const messageText = pendingMessageRef.current
        pendingMessageRef.current = undefined
        setTimeout(() => {
            sendMessageToWorker(messageText)
        }, 100)
    }, [sendMessageToWorker])

    // Auto-scroll to bottom on new messages or streaming content change
    const previousMessageCountRef = useRef(messages.length)
    useEffect(() => {
        if (messages.length !== previousMessageCountRef.current || isStreaming) {
            previousMessageCountRef.current = messages.length
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages, isStreaming])

    // Up-arrow history navigation
    const userMessageHistory = useMemo(
        () =>
            messages
                .filter((m) => m.role === "user")
                .map((m) => {
                    const textPart = m.parts.find((p) => p.type === "text" && p.content)
                    return textPart?.content ?? ""
                })
                .filter(Boolean)
                .reverse(),
        [messages],
    )
    const [historyIndex, setHistoryIndex] = useState(-1)

    const isSubmitting = isSending || isStreaming

    // Show session-loading spinner only when loading a resumed session
    if (params.idAgentSession && isSessionPending && !hasPendingMessage) {
        return (
            <div
                className={css({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    color: "neutral/30",
                    fontSize: "sm",
                })}
            >
                <CircularLoader text="Chargement de la conversation..." />
            </div>
        )
    }

    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
            })}
        >
            {/* Collapsible context panel */}
            <div
                className={css({
                    borderBottom: "1px solid",
                    borderColor: "neutral/10",
                    backgroundColor: "background",
                    flexShrink: 0,
                })}
            >
                <button
                    type="button"
                    onClick={() => setContextOpen((o) => !o)}
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        width: "100%",
                        padding: "0.375rem 1rem",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        fontSize: "xs",
                        color: "neutral/50",
                        _hover: { color: "neutral/70" },
                    })}
                >
                    <IconSettings size={13} />
                    <span>Contexte</span>
                    {contextOpen ? <IconChevronDown size={13} /> : <IconChevronRight size={13} />}
                    {!contextOpen && (selectedYear || customInstructions.trim()) && (
                        <span className={css({ color: "neutral/30", marginLeft: "0.25rem" })}>
                            {[selectedYear?.label, customInstructions.trim() ? "Instructions personnalisees" : ""]
                                .filter(Boolean)
                                .join(" · ")}
                        </span>
                    )}
                </button>

                {contextOpen && (
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            padding: "0 1rem 0.625rem",
                        })}
                    >
                        {/* Year row */}
                        <div
                            className={css({
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                fontSize: "xs",
                                color: "neutral/70",
                            })}
                        >
                            <IconCalendar size={13} className={css({ color: "neutral/40", flexShrink: 0 })} />
                            <span className={css({ flexShrink: 0 })}>Exercice :</span>
                            {isYearsPending ? (
                                <span className={css({ color: "neutral/30" })}>Chargement...</span>
                            ) : !yearsData || yearsData.length === 0 ? (
                                <span className={css({ color: "neutral/30" })}>Aucun exercice</span>
                            ) : (
                                <select
                                    value={selectedYearId ?? ""}
                                    onChange={(e) => setSelectedYearId(e.target.value || undefined)}
                                    className={css({
                                        padding: "0.125rem 0.375rem",
                                        borderRadius: "sm",
                                        border: "1px solid",
                                        borderColor: "neutral/20",
                                        fontSize: "xs",
                                        color: "neutral",
                                        backgroundColor: "white",
                                        outline: "none",
                                        cursor: "pointer",
                                        _focus: { borderColor: "primary" },
                                    })}
                                >
                                    <option value="">Non selectionne</option>
                                    {yearsData.map((year) => (
                                        <option key={year.id} value={year.id}>
                                            {year.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Custom instructions */}
                        <div className={css({ display: "flex", flexDirection: "column", gap: "0.25rem" })}>
                            <label
                                htmlFor="agent-custom-instructions"
                                className={css({ fontSize: "xs", color: "neutral/50" })}
                            >
                                Instructions personnalisees
                            </label>
                            <textarea
                                id="agent-custom-instructions"
                                value={customInstructions}
                                onChange={(e) => setCustomInstructions(e.target.value)}
                                placeholder="Ex: Reponds de maniere detaillee, utilise le compte 411 pour les clients..."
                                rows={3}
                                className={css({
                                    padding: "0.375rem 0.5rem",
                                    borderRadius: "sm",
                                    border: "1px solid",
                                    borderColor: "neutral/20",
                                    fontSize: "xs",
                                    color: "neutral",
                                    backgroundColor: "white",
                                    outline: "none",
                                    resize: "vertical",
                                    lineHeight: "1.4",
                                    _focus: { borderColor: "primary" },
                                    _placeholder: { color: "neutral/30" },
                                })}
                            />
                        </div>

                        {/* Delete session */}
                        {effectiveSessionId && (
                            <button
                                type="button"
                                onClick={handleDeleteSession}
                                disabled={isDeleting}
                                className={css({
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.375rem",
                                    padding: "0.25rem 0",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    cursor: "pointer",
                                    fontSize: "xs",
                                    color: "error/60",
                                    _hover: { color: "error" },
                                    _disabled: { opacity: 0.4, cursor: "not-allowed" },
                                })}
                            >
                                <IconTrash size={13} />
                                <span>{isDeleting ? "Suppression..." : "Supprimer la conversation"}</span>
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Messages area */}
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
                {messages.map((message) => (
                    <AgentMessage key={message.id} message={message} createdAt={message.createdAt} />
                ))}

                {/* Live streaming assistant bubble */}
                {isStreaming && (
                    <AgentMessage
                        message={{
                            id: "streaming",
                            role: "assistant",
                            parts: streamingContent
                                ? [{ type: "text", content: streamingContent }]
                                : [{ type: "text", content: "..." }],
                        }}
                    />
                )}

                {/* Thinking indicator — waiting for first token */}
                {isSending && !isStreaming && (
                    <div className={css({ padding: "0.5rem" })}>
                        <CircularLoader text="Réflexion en cours..." />
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form
                className={css({
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "end",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    borderTop: "1px solid",
                    borderTopColor: "neutral/10",
                    backgroundColor: "white",
                })}
            >
                <InputTextArea
                    value={input}
                    onChange={(value) => setInput(value)}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowUp") {
                            if (userMessageHistory.length === 0) return
                            const nextIndex = Math.min(historyIndex + 1, userMessageHistory.length - 1)
                            setHistoryIndex(nextIndex)
                            setInput(userMessageHistory[nextIndex] ?? "")
                            e.preventDefault()
                        } else if (e.key === "ArrowDown") {
                            if (historyIndex <= 0) {
                                setHistoryIndex(-1)
                                setInput("")
                                e.preventDefault()
                                return
                            }
                            const nextIndex = historyIndex - 1
                            setHistoryIndex(nextIndex)
                            setInput(userMessageHistory[nextIndex] ?? "")
                            e.preventDefault()
                        }
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
                    <ButtonPlainContent isLoading={isSubmitting} leftIcon={<IconSend />} />
                </Button>
            </form>
        </div>
    )
}
