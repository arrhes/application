import {
    readAllAgentSessionsRouteDefinition,
    readAllYearsRouteDefinition,
    readOneAgentSessionRouteDefinition,
} from "@arrhes/application-metadata"
import { CircularLoader } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCalendar, IconChevronDown, IconChevronRight, IconSend, IconSettings } from "@tabler/icons-react"
import { fetchServerSentEvents, useChat } from "@tanstack/ai-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { invalidateData } from "../../utilities/invalidateData.js"
import { useDataFromAPI } from "../../utilities/useHTTPData.js"
import { AgentMessage } from "./agentMessage.js"
import { convertStoredMessagesToUIMessages } from "./convertStoredMessagesToUIMessages.js"

export function AgentChat(props: {
    idOrganization: string
    idAgentSession: string | undefined
    onSessionCreated?: (idAgentSession: string) => void
}) {
    const [input, setInput] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const sessionCreatedRef = useRef(false)

    // Track the effective session ID — starts as props value, updated when server creates one
    const [effectiveSessionId, setEffectiveSessionId] = useState(props.idAgentSession)

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

    // Fetch available years for the context bar
    const { data: yearsData, isPending: isYearsPending } = useDataFromAPI({
        routeDefinition: readAllYearsRouteDefinition,
        body: {},
    })

    // Year selection state — auto-select if only one year exists
    const [selectedYearId, setSelectedYearId] = useState<string | undefined>(undefined)
    const autoSelectedRef = useRef(false)
    useEffect(() => {
        if (autoSelectedRef.current || !yearsData) return
        if (yearsData.length === 1 && yearsData[0]) {
            autoSelectedRef.current = true
            setSelectedYearId(yearsData[0].id)
        }
    }, [yearsData])

    const selectedYear = useMemo(() => yearsData?.find((y) => y.id === selectedYearId), [yearsData, selectedYearId])

    // Custom instructions state
    const [customInstructions, setCustomInstructions] = useState("")

    // Collapsible context panel state
    const [contextOpen, setContextOpen] = useState(false)

    // Load existing messages when resuming a session (only when we have a session ID from props)
    const { data: sessionData, isPending: isSessionPending } = useDataFromAPI({
        routeDefinition: readOneAgentSessionRouteDefinition,
        body: { idAgentSession: props.idAgentSession ?? "" },
        enabled: props.idAgentSession !== undefined && props.idAgentSession !== "",
    })

    const handleSessionCreated = useCallback(
        (idAgentSession: string) => {
            if (sessionCreatedRef.current) return
            sessionCreatedRef.current = true

            // Update the effective session ID for subsequent requests
            setEffectiveSessionId(idAgentSession)

            // Invalidate session list so the new session appears in the sidebar
            invalidateData({
                routeDefinition: readAllAgentSessionsRouteDefinition,
                body: { idOrganization: props.idOrganization },
            })

            // Notify parent so it can track the created session (for sidebar highlighting)
            // Do NOT update the URL here — TanStack Router monkey-patches history.replaceState
            // and would trigger a full route re-evaluation, remounting the component and
            // destroying the active SSE stream.
            props.onSessionCreated?.(idAgentSession)
        },
        [props.idOrganization, props.onSessionCreated],
    )

    const { messages, sendMessage, setMessages, isLoading, error } = useChat({
        connection: fetchServerSentEvents(`${apiBaseUrl}/auth/agent/chat`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }),
        body: {
            idOrganization: props.idOrganization,
            idAgentSession: effectiveSessionId,
            idYear: selectedYear?.id,
            yearLabel: selectedYear?.label,
            customInstructions: customInstructions.trim() || undefined,
        },
        onCustomEvent: (eventType: string, data: unknown) => {
            if (eventType === "session-created") {
                const payload = data as { idAgentSession: string }
                if (payload.idAgentSession) {
                    handleSessionCreated(payload.idAgentSession)
                }
            }
        },
    })

    // When session data loads (resume), populate chat messages
    const hasLoadedSessionRef = useRef(false)
    useEffect(() => {
        if (hasLoadedSessionRef.current) return
        if (!sessionData?.messages || sessionData.messages.length === 0) return
        if (messages.length > 0) return

        hasLoadedSessionRef.current = true
        const uiMessages = convertStoredMessagesToUIMessages(sessionData.messages)
        if (uiMessages.length > 0) {
            setMessages(uiMessages as any)
        }
    }, [sessionData, messages.length, setMessages])

    // Auto-scroll to bottom on new messages
    const previousMessageCountRef = useRef(messages.length)
    useEffect(() => {
        if (messages.length !== previousMessageCountRef.current) {
            previousMessageCountRef.current = messages.length
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (input.trim() === "" || isLoading) return

        sendMessage(input)
        setInput("")
        setHistoryIndex(-1)
    }

    // Collect user messages for up-arrow history navigation
    const userMessageHistory = useMemo(
        () =>
            messages
                .filter((m) => m.role === "user")
                .map((m) => {
                    const textPart = (m.parts as Array<{ type: string; content?: string }>).find(
                        (p) => p.type === "text" && p.content,
                    )
                    return textPart?.content ?? ""
                })
                .filter(Boolean)
                .reverse(), // most recent first
        [messages],
    )
    const [historyIndex, setHistoryIndex] = useState(-1)

    function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
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
    }

    // While loading session data for resume, show a loader
    // Only show for sessions loaded from URL (props.idAgentSession), not mid-stream created ones
    if (props.idAgentSession && isSessionPending) {
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

    const displayMessages = messages.length > 0 ? messages : []

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
                {/* Toggle header */}
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

                {/* Collapsible content */}
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

                        {/* Custom instructions textarea */}
                        <div className={css({ display: "flex", flexDirection: "column", gap: "0.25rem" })}>
                            <label
                                htmlFor="agent-custom-instructions"
                                className={css({
                                    fontSize: "xs",
                                    color: "neutral/50",
                                })}
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
                    </div>
                )}
            </div>

            {/* Messages area */}
            <div
                className={css({
                    flex: 1,
                    overflowY: "auto",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                })}
            >
                {displayMessages.length === 0 && !isLoading && (
                    <div
                        className={css({
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "neutral/30",
                            fontSize: "sm",
                        })}
                    >
                        Posez une question sur votre comptabilite...
                    </div>
                )}

                {displayMessages.map((message) => (
                    <AgentMessage key={message.id} message={message} />
                ))}

                {isLoading && messages.at(-1)?.role !== "assistant" && (
                    <div className={css({ padding: "0.5rem" })}>
                        <CircularLoader text="Reflexion en cours..." />
                    </div>
                )}

                {error && (
                    <div
                        className={css({
                            padding: "0.5rem 0.75rem",
                            borderRadius: "sm",
                            backgroundColor: "error/10",
                            color: "error",
                            fontSize: "sm",
                        })}
                    >
                        Erreur : {error.message}
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form
                onSubmit={handleSubmit}
                className={css({
                    display: "flex",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    borderTop: "1px solid",
                    borderColor: "neutral/10",
                    backgroundColor: "white",
                })}
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Votre message..."
                    disabled={isLoading}
                    className={css({
                        flex: 1,
                        padding: "0.5rem 0.75rem",
                        borderRadius: "sm",
                        border: "1px solid",
                        borderColor: "neutral/20",
                        fontSize: "sm",
                        outline: "none",
                        color: "neutral",
                        _focus: {
                            borderColor: "primary",
                        },
                        _disabled: {
                            opacity: 0.5,
                            cursor: "not-allowed",
                        },
                    })}
                />
                <button
                    type="submit"
                    disabled={isLoading || input.trim() === ""}
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0.5rem",
                        borderRadius: "sm",
                        border: "none",
                        backgroundColor: "primary",
                        color: "white",
                        cursor: "pointer",
                        _hover: {
                            opacity: 0.9,
                        },
                        _disabled: {
                            opacity: 0.4,
                            cursor: "not-allowed",
                        },
                    })}
                >
                    <IconSend size={16} />
                </button>
            </form>
        </div>
    )
}
