import {
    createOneAgentMessageRouteDefinition,
    deleteOneAgentSessionRouteDefinition,
    getStreamForAgentMessageRouteDefinition,
    readAllAgentMessagesRouteDefinition,
    readAllAgentSessionsRouteDefinition,
    readAllYearsRouteDefinition,
    readOneAgentSessionRouteDefinition,
    updateOneAgentSessionRouteDefinition,
} from "@arrhes/application-metadata"
import {
    Button,
    ButtonGhostContent,
    ButtonOutlineContent,
    ButtonPlainContent,
    CircularLoader,
    InputSelect,
    InputTextArea,
    toast,
} from "@arrhes/ui"
import { css } from "@arrhes/ui/css"
import { IconDotsVertical, IconNotebook, IconSend, IconTrash } from "@tabler/icons-react"
import { useNavigate, useParams } from "@tanstack/react-router"
import { useCallback, useEffect, useRef, useState } from "react"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { Dropdown } from "../../../../components/layouts/dropdownMenu/dropdown.tsx"
import { ConfirmationModal } from "../../../../components/overlays/dialog/confirmationModal.tsx"
import { Popover } from "../../../../components/overlays/popover/popover.tsx"
import { dataClient } from "../../../../contexts/data/queryClient.ts"
import { agentSessionRoute } from "../../../../routes/root/dashboard/agent/agentSessionRoute.tsx"
import { getCookie } from "../../../../utilities/cookies/getCookie.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"
import { useDataFromAPI } from "../../../../utilities/useHTTPData.ts"
import { cookiePrefix } from "../../../../utilities/variables.js"
import { AgentMessage } from "./agentMessage.tsx"

function ContextInitialiser(props: {
    agentSession: { idYear: string | null; customInstructions: string | null }
    contextInitialisedRef: React.MutableRefObject<boolean>
    setEditYear: (v: string | null | undefined) => void
    setEditInstructions: (v: string | null | undefined) => void
    children: React.ReactNode
}) {
    useEffect(() => {
        if (!props.contextInitialisedRef.current) {
            props.contextInitialisedRef.current = true
            props.setEditYear(props.agentSession.idYear ?? null)
            props.setEditInstructions(props.agentSession.customInstructions ?? "")
        }
    }, [props.agentSession, props.contextInitialisedRef, props.setEditInstructions, props.setEditYear])

    return <>{props.children}</>
}

export function AgentSessionContent() {
    const params = useParams({ from: agentSessionRoute.id })

    const [input, setInput] = useState<string | null | undefined>(undefined)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const _scrollContainerRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [editYear, setEditYear] = useState<string | null | undefined>(undefined)
    const [editInstructions, setEditInstructions] = useState<string | null | undefined>(undefined)
    const [isSavingContext, setIsSavingContext] = useState(false)
    const contextInitialisedRef = useRef(false)

    const { data: yearsData } = useDataFromAPI({
        routeDefinition: readAllYearsRouteDefinition,
        body: {},
    })

    const handleSaveContext = useCallback(async () => {
        setIsSavingContext(true)
        try {
            const result = await getResponseBodyFromAPI({
                routeDefinition: updateOneAgentSessionRouteDefinition,
                body: {
                    idAgentSession: params.idAgentSession,
                    idYear: editYear || null,
                    customInstructions: editInstructions?.trim() || null,
                },
            })
            if (result.ok) {
                toast({ title: "Contexte mis à jour", variant: "success" })
                await invalidateData({
                    routeDefinition: readOneAgentSessionRouteDefinition,
                    body: { idAgentSession: params.idAgentSession },
                })
            } else {
                toast({ title: "Erreur lors de la mise à jour", variant: "error" })
            }
        } finally {
            setIsSavingContext(false)
        }
    }, [params.idAgentSession, editYear, editInstructions])

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
    }, [navigate, params.idAgentSession, params.idOrganization])

    // ── Streaming state ─────────────────────────────────────────────────────────
    // ID of the assistant message currently being streamed from the worker
    const [streamMessageId, setStreamMessageId] = useState<string | undefined>(undefined)
    const [isSending, setIsSending] = useState(false)
    // Accumulates the text content of the in-progress assistant message
    const [streamingContent, setStreamingContent] = useState<string>("")
    const [streamingToolCalls, setStreamingToolCalls] = useState<unknown[]>([])
    const [isStreaming, setIsStreaming] = useState(false)
    const abortStreamRef = useRef<AbortController | null>(null)

    // ── Auto-scroll to bottom on new content ────────────────────────────────
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    // Scroll when streaming content or tool calls update
    useEffect(() => {
        if (isStreaming) scrollToBottom()
    }, [isStreaming, scrollToBottom])

    // ── Auto-detect streaming messages on page load / navigation ────────────
    // If the user opens a session that already has a message in "streaming"
    // state (e.g. page refresh while the worker is running), start the SSE
    // connection for it automatically.
    const { data: messagesData } = useDataFromAPI({
        routeDefinition: readAllAgentMessagesRouteDefinition,
        body: { idAgentSession: params.idAgentSession },
    })

    // Scroll when messages list changes (new message added, stream completed)
    useEffect(() => {
        if (messagesData) scrollToBottom()
    }, [messagesData, scrollToBottom])

    useEffect(() => {
        if (streamMessageId) return // already streaming something
        if (!messagesData) return

        const streamingMsg = messagesData.find((m) => m.state === "streaming")
        if (streamingMsg) {
            setStreamMessageId(streamingMsg.id)
        }
    }, [messagesData, streamMessageId])

    // Single effect: open SSE stream, poll as fallback, self-cleanup
    useEffect(() => {
        if (!streamMessageId) return

        // Abort any previous stream
        abortStreamRef.current?.abort()
        const controller = new AbortController()
        abortStreamRef.current = controller

        setIsStreaming(true)
        setStreamingContent("")
        setStreamingToolCalls([])

        let accumulated = ""
        const accumulatedToolCalls: unknown[] = []
        let lastBoundaryLen = 0
        const seenEnds = new Set<string>()
        let finished = false

        const finish = async () => {
            if (finished) return
            finished = true
            await invalidateData({
                routeDefinition: readAllAgentMessagesRouteDefinition,
                body: { idAgentSession: params.idAgentSession },
            })
            setStreamingContent("")
            setStreamingToolCalls([])
            setIsStreaming(false)
            setStreamMessageId(undefined)
        }

            // SSE stream
            ; (async () => {
                let streamCompleted = false
                try {
                    const headers: Record<string, string> = { "Content-Type": "application/json" }
                    const orgCookie = getCookie(`${cookiePrefix}_id_organization`)
                    if (orgCookie) {
                        headers["X-Organization-Id"] = orgCookie
                    }

                    const response = await fetch(
                        new URL(`${import.meta.env.VITE_API_BASE_URL}${getStreamForAgentMessageRouteDefinition.path}`),
                        {
                            method: "POST",
                            credentials: "include",
                            signal: controller.signal,
                            headers,
                            body: JSON.stringify({
                                idOrganization: params.idOrganization,
                                idAgentMessage: streamMessageId,
                            }),
                        },
                    )

                    if (!response.ok || !response.body) {
                        // SSE failed — polling will pick it up
                        return
                    }

                    const reader = response.body.getReader()
                    const decoder = new TextDecoder()
                    let buffer = ""

                    while (true) {
                        const { done, value } = await reader.read()
                        if (done) break

                        buffer += decoder.decode(value, { stream: true })

                        const parts = buffer.split("\n\n")
                        buffer = parts.pop() ?? ""

                        for (const part of parts) {
                            for (const line of part.split("\n")) {
                                if (!line.startsWith("data: ")) continue
                                const jsonStr = line.slice(6).trim()
                                if (!jsonStr) continue

                                try {
                                    const chunk = JSON.parse(jsonStr)
                                    if (chunk.type === "TEXT_MESSAGE_CONTENT" && typeof chunk.delta === "string") {
                                        accumulated += chunk.delta
                                        setStreamingContent(accumulated)
                                    }
                                    if (chunk.type === "TOOL_CALL_START") {
                                        // Emit text boundary if text accumulated since last boundary
                                        if (accumulated.length > lastBoundaryLen) {
                                            accumulatedToolCalls.push({
                                                type: "TEXT_BOUNDARY",
                                                contentLength: accumulated.length,
                                            })
                                            lastBoundaryLen = accumulated.length
                                        }
                                        accumulatedToolCalls.push(chunk)
                                        setStreamingToolCalls([...accumulatedToolCalls])
                                    }
                                    if (chunk.type === "TOOL_CALL_END") {
                                        // Deduplicate: framework re-emits TOOL_CALL_END after RUN_FINISHED
                                        const tcId = chunk.toolCallId as string | undefined
                                        if (tcId && seenEnds.has(tcId)) continue
                                        if (tcId) seenEnds.add(tcId)
                                        accumulatedToolCalls.push(chunk)
                                        setStreamingToolCalls([...accumulatedToolCalls])
                                    }
                                } catch {
                                    // ignore malformed chunks
                                }
                            }
                        }
                    }

                    streamCompleted = true
                } catch (err: unknown) {
                    if (err instanceof Error && err.name === "AbortError") return
                    console.error("[stream] SSE error — falling back to polling", err)
                } finally {
                    // Only finish when the stream completed naturally.
                    // If the SSE failed (network/auth error), let the polling
                    // fallback continue running so it can detect completion.
                    if (streamCompleted && !controller.signal.aborted) {
                        finish()
                    }
                }
            })()

        // Polling failsafe: if SSE fails or is slow, periodically
        // check the DB for the completed message
        const poll = setInterval(async () => {
            try {
                const result = await getResponseBodyFromAPI({
                    routeDefinition: readAllAgentMessagesRouteDefinition,
                    body: { idAgentSession: params.idAgentSession },
                    signal: controller.signal,
                })
                if (!result.ok || !result.data) return

                const msg = result.data.find((m) => m.id === streamMessageId)
                if (msg && msg.state !== "streaming") {
                    controller.abort()
                    finish()
                }
            } catch {
                // ignore polling errors
            }
        }, 3000)

        return () => {
            clearInterval(poll)
            controller.abort()
        }
    }, [streamMessageId, params.idAgentSession, params.idOrganization])

    // ── Send message ────────────────────────────────────────────────────────────
    const sendMessageToWorker = useCallback(
        async (text: string) => {
            if (!text.trim() || isSending) return
            setIsSending(true)

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

                const { id: idAgentMessage } = result.data

                // Trigger SSE stream FIRST — before invalidating, so the SSE
                // connection starts immediately and isn't killed by the detection effect
                // seeing "completed" state in freshly-refetched data.
                setStreamMessageId(idAgentMessage)

                // Then refresh messages so the new user message + assistant placeholder appear
                await invalidateData({
                    routeDefinition: readAllAgentMessagesRouteDefinition,
                    body: { idAgentSession: params.idAgentSession },
                })
                scrollToBottom()
            } finally {
                setIsSending(false)
            }
        },
        [isSending, params.idOrganization, params.idAgentSession, scrollToBottom],
    )

    const [_historyIndex, setHistoryIndex] = useState(-1)

    const isSubmitting = isSending || isStreaming

    return (
        <DataWrapper
            routeDefinition={readOneAgentSessionRouteDefinition}
            body={{
                idAgentSession: params.idAgentSession,
            }}
        >
            {(agentSession) => {
                const _hasContext = Boolean(agentSession.idYear || agentSession.customInstructions?.trim())

                return (
                    <ContextInitialiser
                        agentSession={agentSession}
                        contextInitialisedRef={contextInitialisedRef}
                        setEditYear={setEditYear}
                        setEditInstructions={setEditInstructions}
                    >
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
                                    const sortedAgentMessages = agentMessages.sort(
                                        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                                    )

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
                                            {sortedAgentMessages.map((agentMessage) => {
                                                // If this is the message being streamed, show live content
                                                if (agentMessage.id === streamMessageId && isStreaming) {
                                                    return (
                                                        <AgentMessage
                                                            key={agentMessage.id}
                                                            agentMessage={{
                                                                ...agentMessage,
                                                                content: streamingContent || null,
                                                                toolCalls:
                                                                    streamingToolCalls.length > 0
                                                                        ? streamingToolCalls
                                                                        : agentMessage.toolCalls,
                                                            }}
                                                        />
                                                    )
                                                }
                                                return (
                                                    <AgentMessage key={agentMessage.id} agentMessage={agentMessage} />
                                                )
                                            })}

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
                                        if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
                                            e.preventDefault()
                                            if (
                                                input === null ||
                                                input === undefined ||
                                                input.trim() === "" ||
                                                isSubmitting
                                            )
                                                return
                                            sendMessageToWorker(input)
                                            setInput("")
                                            setHistoryIndex(-1)
                                        }
                                    }}
                                    placeholder="Votre message..."
                                    disabled={isSubmitting}
                                    className={css({ flex: 1 })}
                                />
                                <div
                                    className={css({
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    })}
                                >
                                    <Dropdown.Root>
                                        <Dropdown.Trigger title="Actions de la session">
                                            <ButtonGhostContent
                                                leftIcon={<IconDotsVertical size={16} />}
                                                text={undefined}
                                            />
                                        </Dropdown.Trigger>
                                        <Dropdown.Content align="end">
                                            <Dropdown.Item onSelect={() => setDeleteOpen(true)}>
                                                <ButtonGhostContent
                                                    leftIcon={<IconTrash />}
                                                    text={isDeleting ? "Suppression..." : "Supprimer la session"}
                                                    color="danger"
                                                    className={css({ width: "100%", justifyContent: "start" })}
                                                />
                                            </Dropdown.Item>
                                        </Dropdown.Content>
                                    </Dropdown.Root>
                                    <Popover.Root>
                                        <Popover.Trigger asChild>
                                            <Button title="Contexte de la session">
                                                <ButtonOutlineContent
                                                    leftIcon={<IconNotebook />}
                                                // text="Contexte"
                                                />
                                            </Button>
                                        </Popover.Trigger>
                                        <Popover.Content
                                            side="top"
                                            align="end"
                                            className={css({
                                                width: "320px",
                                                maxWidth: "calc(100vw - 2rem)",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "0.75rem",
                                                padding: "0.75rem",
                                            })}
                                        >
                                            <div
                                                className={css({
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "0.25rem",
                                                })}
                                            >
                                                <span
                                                    className={css({
                                                        fontSize: "sm",
                                                        fontWeight: "medium",
                                                        color: "neutral",
                                                    })}
                                                >
                                                    Contexte de la session
                                                </span>
                                                <span className={css({ fontSize: "xs", color: "neutral/60" })}>
                                                    Ce contexte guide les réponses de l'assistant pour cette session.
                                                </span>
                                            </div>

                                            <div
                                                className={css({
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "0.75rem",
                                                })}
                                            >
                                                <div
                                                    className={css({
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "0.25rem",
                                                    })}
                                                >
                                                    <span
                                                        className={css({
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "0.375rem",
                                                            fontSize: "xs",
                                                            fontWeight: "medium",
                                                            color: "neutral/70",
                                                            textTransform: "uppercase",
                                                        })}
                                                    >
                                                        Exercice
                                                    </span>
                                                    <InputSelect
                                                        value={editYear}
                                                        onChange={(value) => setEditYear(value)}
                                                        allowEmpty={true}
                                                        placeholder="Sélectionner un exercice"
                                                        options={
                                                            yearsData === undefined
                                                                ? []
                                                                : yearsData.map((year) => ({
                                                                    key: year.id,
                                                                    label: year.label,
                                                                }))
                                                        }
                                                    />
                                                </div>

                                                <div
                                                    className={css({
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "0.25rem",
                                                    })}
                                                >
                                                    <span
                                                        className={css({
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "0.375rem",
                                                            fontSize: "xs",
                                                            fontWeight: "medium",
                                                            color: "neutral/70",
                                                            textTransform: "uppercase",
                                                        })}
                                                    >
                                                        Instructions
                                                    </span>
                                                    <InputTextArea
                                                        value={editInstructions}
                                                        onChange={(value) => setEditInstructions(value)}
                                                        placeholder="Ex: Réponds de manière détaillée, utilise le compte 411 pour les clients..."
                                                    />
                                                </div>
                                            </div>

                                            <Button onClick={handleSaveContext} isDisabled={isSavingContext}>
                                                <ButtonPlainContent isLoading={isSavingContext} text="Enregistrer" />
                                            </Button>
                                        </Popover.Content>
                                    </Popover.Root>
                                    <Button
                                        isDisabled={isSubmitting}
                                        onClick={(event) => {
                                            event.preventDefault()
                                            if (
                                                input === null ||
                                                input === undefined ||
                                                input.trim() === "" ||
                                                isSubmitting
                                            )
                                                return
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
                                <ConfirmationModal
                                    title="Voulez-vous supprimer cette session ?"
                                    description="Cette action supprimera définitivement la conversation et son historique. Cette action est irréversible."
                                    submitButtonProps={{ color: "danger", text: "Supprimer la session" }}
                                    onSubmit={handleDeleteSession}
                                    open={deleteOpen}
                                    onOpenChange={setDeleteOpen}
                                />
                            </div>
                        </div>
                    </ContextInitialiser>
                )
            }}
        </DataWrapper>
    )
}
