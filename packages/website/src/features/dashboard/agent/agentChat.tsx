import {
    deleteOneAgentSessionRouteDefinition,
    readAllAgentSessionsRouteDefinition,
    readAllYearsRouteDefinition,
    readOneAgentSessionRouteDefinition,
} from "@arrhes/application-metadata"
import { CircularLoader } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCalendar, IconChevronDown, IconChevronRight, IconSend, IconSettings, IconTrash } from "@tabler/icons-react"
import { fetchServerSentEvents, useChat } from "@tanstack/ai-react"
import { Link, useNavigate } from "@tanstack/react-router"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { dataClient } from "../../../contexts/data/queryClient.js"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.js"
import { useDataFromAPI } from "../../../utilities/useHTTPData.js"
import { consumePendingAgentMessage, useAgentActiveSession } from "./agentActiveSessionContext.tsx"
import { AgentMessage } from "./agentMessage.js"
import { convertStoredMessagesToUIMessages } from "./convertStoredMessagesToUIMessages.js"

const suggestionChips = [
    "Montre-moi mes écritures récentes",
    "Combien de comptes ai-je dans mon plan comptable ?",
    "Génère le journal du mois en cours",
    "Quels sont mes exercices ouverts ?",
]

export function AgentChat(props: {
    idOrganization: string
    idAgentSession: string | undefined
    onSessionCreated?: (idAgentSession: string) => void
}) {
    const [input, setInput] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const sessionCreatedRef = useRef(false)
    const navigate = useNavigate()
    const { setActiveSessionId } = useAgentActiveSession()
    const [isDeleting, setIsDeleting] = useState(false)

    // Read pending first message from module-level store (set by AgentNewSessionPage).
    // Uses useState initializer (not useMemo) because the initializer only runs ONCE
    // even in React StrictMode, whereas useMemo runs on every render — the second
    // StrictMode render would get undefined after the first render consumed the store.
    const [pending] = useState(() => consumePendingAgentMessage())
    const pendingMessageRef = useRef(pending.message)
    const pendingYearIdRef = useRef(pending.yearId)

    // Track the effective session ID — starts as props value, updated when server creates one
    const [effectiveSessionId, setEffectiveSessionId] = useState(props.idAgentSession)

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

    // Fetch available years for the context bar
    const { data: yearsData, isPending: isYearsPending } = useDataFromAPI({
        routeDefinition: readAllYearsRouteDefinition,
        body: {},
    })

    // Year selection state — auto-select if only one year exists, or use pending year from context
    const [selectedYearId, setSelectedYearId] = useState<string | undefined>(pendingYearIdRef.current)
    const autoSelectedRef = useRef(!!pendingYearIdRef.current)
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

    // Load existing messages when resuming a session (only when we have a session ID from props
    // AND there's no pending first message — pending means we just created this session)
    const hasPendingMessage = !!pendingMessageRef.current
    const { data: sessionData, isPending: isSessionPending } = useDataFromAPI({
        routeDefinition: readOneAgentSessionRouteDefinition,
        body: { idAgentSession: props.idAgentSession ?? "" },
        enabled: props.idAgentSession !== undefined && props.idAgentSession !== "" && !hasPendingMessage,
    })

    const handleSessionCreated = useCallback(
        (idAgentSession: string) => {
            if (sessionCreatedRef.current) return
            sessionCreatedRef.current = true

            // Update the effective session ID for subsequent requests
            setEffectiveSessionId(idAgentSession)

            // Invalidate session list so the new session appears in the sidebar
            dataClient.invalidateQueries({
                queryKey: [readAllAgentSessionsRouteDefinition.path],
                exact: false,
            })

            // Notify parent so it can track the created session (for sidebar highlighting)
            props.onSessionCreated?.(idAgentSession)

            // Navigate to the concrete session URL
            navigate({
                to: "/dashboard/organisations/$idOrganization/agent/sessions/$idAgentSession",
                params: { idOrganization: props.idOrganization, idAgentSession },
            })
        },
        [navigate, props.idOrganization, props.onSessionCreated],
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
                params: { idOrganization: props.idOrganization },
            })
        } finally {
            setIsDeleting(false)
        }
    }, [effectiveSessionId, navigate, props.idOrganization, setActiveSessionId])

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

    // Send pending first message via useChat on mount (set by AgentNewSessionPage).
    // StrictMode runs: effect → cleanup → effect. A setTimeout with cleanup would be
    // cleared before it fires. We use hasSentPendingRef to ensure only the first
    // effect execution initiates the send, and we DON'T return a cleanup function
    // so the setTimeout survives StrictMode's unmount/remount cycle.
    const hasSentPendingRef = useRef(false)
    useEffect(() => {
        if (hasSentPendingRef.current) return
        if (!pendingMessageRef.current) return

        hasSentPendingRef.current = true
        const messageText = pendingMessageRef.current
        pendingMessageRef.current = undefined

        // Small delay to ensure useChat's internal ChatClient is fully initialized.
        // No cleanup returned — the timeout must survive StrictMode's effect re-run.
        setTimeout(() => {
            sendMessage(messageText)
        }, 100)
    }, [sendMessage])

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
    // Also skip when there's a pending first message (we're about to send, not loading from DB)
    if (props.idAgentSession && isSessionPending && !hasPendingMessage) {
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

    // Welcome screen — shown when there is no session, no pending message, and no messages yet
    const showWelcome = !props.idAgentSession && messages.length === 0 && !isLoading && !hasPendingMessage

    function handleWelcomeSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (input.trim() === "" || isLoading) return
        sendMessage(input)
        setInput("")
    }

    function handleChipClick(text: string) {
        sendMessage(text)
    }

    function handleWelcomeKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            if (input.trim() !== "" && !isLoading) {
                sendMessage(input)
                setInput("")
            }
        }
    }

    if (showWelcome) {
        return (
            <div
                className={css({
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    gap: "2rem",
                    minHeight: 0,
                    overflowY: "auto",
                    height: "100%",
                })}
            >
                {/* Greeting */}
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                        textAlign: "center",
                    })}
                >
                    <h1
                        className={css({
                            fontSize: "2xl",
                            fontWeight: "semibold",
                            color: "neutral",
                            margin: 0,
                        })}
                    >
                        Comment puis-je vous aider ?
                    </h1>
                    <p
                        className={css({
                            fontSize: "sm",
                            color: "neutral/50",
                            margin: 0,
                            maxWidth: "28rem",
                        })}
                    >
                        Posez une question sur votre comptabilité, demandez une action ou explorez vos données.
                    </p>
                </div>

                {/* Input area */}
                <form
                    onSubmit={handleWelcomeSubmit}
                    className={css({
                        width: "100%",
                        maxWidth: "40rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            gap: "0.5rem",
                            border: "1px solid",
                            borderColor: "neutral/20",
                            borderRadius: "lg",
                            padding: "0.75rem",
                            backgroundColor: "white",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                            _focusWithin: { borderColor: "primary", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" },
                            transition: "all 0.15s",
                        })}
                    >
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleWelcomeKeyDown}
                            placeholder="Votre message..."
                            disabled={isLoading}
                            rows={1}
                            className={css({
                                flex: 1,
                                padding: "0.25rem 0",
                                border: "none",
                                fontSize: "sm",
                                outline: "none",
                                color: "neutral",
                                resize: "none",
                                lineHeight: "1.5",
                                _disabled: { opacity: 0.5, cursor: "not-allowed" },
                                _placeholder: { color: "neutral/30" },
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
                                borderRadius: "md",
                                border: "none",
                                backgroundColor: "primary",
                                color: "white",
                                cursor: "pointer",
                                flexShrink: 0,
                                alignSelf: "flex-end",
                                _hover: { opacity: 0.9 },
                                _disabled: { opacity: 0.4, cursor: "not-allowed" },
                            })}
                        >
                            <IconSend size={16} />
                        </button>
                    </div>
                </form>

                {/* Suggestion chips */}
                <div
                    className={css({
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        justifyContent: "center",
                        maxWidth: "40rem",
                    })}
                >
                    {suggestionChips.map((chip) => (
                        <button
                            key={chip}
                            type="button"
                            onClick={() => handleChipClick(chip)}
                            disabled={isLoading}
                            className={css({
                                padding: "0.375rem 0.75rem",
                                borderRadius: "full",
                                border: "1px solid",
                                borderColor: "neutral/15",
                                backgroundColor: "white",
                                fontSize: "xs",
                                color: "neutral/70",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                transition: "all 0.15s",
                                _hover: { borderColor: "primary/30", color: "primary", backgroundColor: "primary/5" },
                                _disabled: { opacity: 0.5, cursor: "not-allowed" },
                            })}
                        >
                            {chip}
                        </button>
                    ))}
                </div>

                {/* Disclaimer */}
                <p
                    className={css({
                        fontSize: "xs",
                        color: "neutral/30",
                        textAlign: "center",
                        maxWidth: "40rem",
                        lineHeight: "1.5",
                        margin: 0,
                    })}
                >
                    L'assistant peut faire des erreurs. Vérifiez les informations importantes.{" "}
                    <Link
                        to="/documentation/dashboard/assistant"
                        target="_blank"
                        className={css({
                            color: "primary/60",
                            textDecoration: "underline",
                            _hover: { color: "primary" },
                        })}
                    >
                        En savoir plus
                    </Link>
                </p>
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
                {displayMessages.map((message) => (
                    <AgentMessage key={message.id} message={message} createdAt={message.createdAt} />
                ))}

                {isLoading && messages.at(-1)?.role !== "assistant" && (
                    <div className={css({ padding: "0.5rem" })}>
                        <CircularLoader text="Reflexion en cours..." />
                    </div>
                )}

                {isLoading && messages.at(-1)?.role === "assistant" && (
                    <div className={css({ padding: "0.25rem 0.5rem" })}>
                        <CircularLoader text="En cours de generation..." />
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
                    borderTopColor: "neutral/10",
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

            {/* Disclaimer */}
            <div
                className={css({
                    padding: "0.25rem 1rem 0.375rem",
                    textAlign: "center",
                    flexShrink: 0,
                })}
            >
                <p
                    className={css({
                        fontSize: "xs",
                        color: "neutral/25",
                        margin: 0,
                        lineHeight: "1.4",
                    })}
                >
                    L'assistant peut faire des erreurs.{" "}
                    <Link
                        to="/documentation/dashboard/assistant"
                        target="_blank"
                        className={css({
                            color: "primary/40",
                            textDecoration: "underline",
                            _hover: { color: "primary" },
                        })}
                    >
                        En savoir plus
                    </Link>
                </p>
            </div>
        </div>
    )
}
