import {
    createOneAgentFileRouteDefinition,
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
import {
    IconChevronRight,
    IconDotsVertical,
    IconNotebook,
    IconPaperclip,
    IconSend,
    IconTrash,
    IconX,
} from "@tabler/icons-react"
import { useNavigate, useParams } from "@tanstack/react-router"
import { useCallback, useEffect, useRef, useState } from "react"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { ConfirmationModal } from "../../../../components/overlays/dialog/confirmationModal.tsx"
import { Popover } from "../../../../components/overlays/popover/popover.tsx"
import { dataClient } from "../../../../contexts/data/queryClient.ts"
import { agentSessionRoute } from "../../../../routes/root/dashboard/agent/agentSessionRoute.tsx"
import { getCookie } from "../../../../utilities/cookies/getCookie.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"
import { resolveApiBaseUrl } from "../../../../utilities/resolveApiBaseUrl.js"
import { useDataFromAPI } from "../../../../utilities/useHTTPData.ts"
import { cookiePrefix } from "../../../../utilities/variables.js"
import { AgentMessage } from "./agentMessage.tsx"
import { isHealthyStreamResponse } from "./isStreamResponseUnavailable.ts"
import { MentionInput, type MentionReference } from "./mentionInput.tsx"

const subagentLabels: Record<string, string> = {
    data_analyst: "Analyste de données",
    entry_creator: "Créateur d'écritures",
    document_processor: "Traitement de documents",
    auditor: "Auditeur",
}

function SubagentIndicator(props: { subagents: Array<{ role: string; depth: number; content: string }> }) {
    const [expanded, setExpanded] = useState<Record<number, boolean>>({})

    return (
        <div className={css({ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" })}>
            {props.subagents.map((subagent, index) => {
                const isExpanded = expanded[index] ?? false
                const label = subagentLabels[subagent.role] ?? subagent.role

                return (
                    <div
                        key={`${subagent.role}-${subagent.depth}-${index}`}
                        className={css({
                            marginLeft: `${subagent.depth * 1}rem`,
                            border: "1px solid",
                            borderColor: "border.default",
                            borderRadius: "md",
                            overflow: "hidden",
                        })}
                    >
                        <Button onClick={() => setExpanded((prev) => ({ ...prev, [index]: !prev[index] }))}>
                            <ButtonGhostContent leftIcon={<IconChevronRight />} text={label} />
                            <CircularLoader />
                        </Button>
                        {isExpanded && subagent.content && (
                            <div
                                className={css({
                                    padding: "0.5rem 0.75rem",
                                    fontSize: "0.8125rem",
                                    whiteSpace: "pre-wrap",
                                    color: "fg.muted",
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                })}
                            >
                                {subagent.content}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

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
    const [draftReferences, setDraftReferences] = useState<MentionReference[]>([])
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const _scrollContainerRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [editYear, setEditYear] = useState<string | null | undefined>(undefined)
    const [editInstructions, setEditInstructions] = useState<string | null | undefined>(undefined)
    const [isSavingContext, setIsSavingContext] = useState(false)
    const contextInitialisedRef = useRef(false)
    const [pendingFiles, setPendingFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

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
    const [activeSubagents, setActiveSubagents] = useState<Array<{ role: string; depth: number; content: string }>>([])
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
        setActiveSubagents([])

        let accumulated = ""
        const accumulatedToolCalls: unknown[] = []
        let lastBoundaryLen = 0
        const seenEnds = new Set<string>()
        let finished = false
        const subagentStack: Array<{ role: string; depth: number; content: string }> = []

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
        ;(async () => {
            let streamCompleted = false
            try {
                const headers: Record<string, string> = { "Content-Type": "application/json" }
                const orgCookie = getCookie(`${cookiePrefix}_id_organization`)
                if (orgCookie) {
                    headers["X-Organization-Id"] = orgCookie
                }

                const apiBaseUrl = resolveApiBaseUrl(import.meta.env.VITE_API_BASE_URL)
                if (!apiBaseUrl) {
                    throw new Error("VITE_API_BASE_URL is not configured")
                }

                const response = await fetch(new URL(`${apiBaseUrl}${getStreamForAgentMessageRouteDefinition.path}`), {
                    method: "POST",
                    credentials: "include",
                    signal: controller.signal,
                    headers,
                    body: JSON.stringify({
                        idOrganization: params.idOrganization,
                        idAgentMessage: streamMessageId,
                    }),
                })

                if (!isHealthyStreamResponse(response)) {
                    toast({
                        title: "Le flux de reponse est indisponible",
                        description: "Veuillez renvoyer votre message.",
                        variant: "error",
                    })
                    if (!controller.signal.aborted) {
                        await finish()
                    }
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
                                    if (chunk.subagentSkills && subagentStack.length > 0) {
                                        // Accumulate subagent content
                                        const current = subagentStack[subagentStack.length - 1]
                                        if (current) {
                                            current.content += chunk.delta
                                            setActiveSubagents([...subagentStack])
                                        }
                                    } else {
                                        accumulated += chunk.delta
                                        setStreamingContent(accumulated)
                                    }
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
                                if (chunk.type === "CONTEXT_LIMIT_WARNING") {
                                    toast({
                                        title: "La conversation approche de sa limite de contexte",
                                        description: `${chunk.usage}% de la capacité utilisée. Envisagez de créer une nouvelle session.`,
                                        variant: "warning",
                                    })
                                }
                                if (chunk.type === "TOOL_CALL_END") {
                                    // Deduplicate: framework re-emits TOOL_CALL_END after RUN_FINISHED
                                    const tcId = chunk.toolCallId as string | undefined
                                    if (tcId && seenEnds.has(tcId)) continue
                                    if (tcId) seenEnds.add(tcId)
                                    accumulatedToolCalls.push(chunk)
                                    setStreamingToolCalls([...accumulatedToolCalls])
                                }
                                if (chunk.type === "SUBAGENT_RUN_START") {
                                    subagentStack.push({
                                        role: (chunk.skills as string) ?? "subagent",
                                        depth: chunk.depth as number,
                                        content: "",
                                    })
                                    setActiveSubagents([...subagentStack])
                                }
                                if (chunk.type === "SUBAGENT_RUN_END") {
                                    subagentStack.pop()
                                    setActiveSubagents([...subagentStack])
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
        async (
            text: string,
            references?: MentionReference[],
            options?: {
                idYear?: string | null
                attachedFiles?: Array<{ idFile: string; name: string }> | null
            },
        ) => {
            if (!text.trim() || isSending) return
            setIsSending(true)

            try {
                if (pendingFiles.length > 0) {
                    if (!options?.idYear) {
                        toast({
                            title: "Veuillez sélectionner un exercice pour importer des fichiers",
                            variant: "warning",
                        })
                        return
                    }

                    const existingIds = (options.attachedFiles ?? []).map((file) => file.idFile)
                    const newIds: string[] = []
                    const failedFiles: File[] = []

                    for (const file of pendingFiles) {
                        const hashBuffer = await crypto.subtle.digest("SHA-256", await file.arrayBuffer())
                        const fileHash = Array.from(new Uint8Array(hashBuffer))
                            .map((b) => b.toString(16).padStart(2, "0"))
                            .join("")

                        const createFileResponse = await getResponseBodyFromAPI({
                            routeDefinition: createOneAgentFileRouteDefinition,
                            body: {
                                idOrganization: params.idOrganization,
                                idAgentSession: params.idAgentSession,
                                fileName: file.name,
                                fileType: file.type || "application/octet-stream",
                                fileSize: file.size,
                                fileHash,
                            },
                        })

                        if (createFileResponse.ok === false) {
                            toast({ title: `Impossible d'importer ${file.name}`, variant: "error" })
                            failedFiles.push(file)
                            continue
                        }

                        if (createFileResponse.data.url) {
                            const uploadResponse = await fetch(createFileResponse.data.url, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": file.type || "application/octet-stream",
                                },
                                body: file,
                            })
                            if (!uploadResponse.ok) {
                                toast({ title: `Échec de l'envoi de ${file.name}`, variant: "error" })
                                failedFiles.push(file)
                                continue
                            }
                        }

                        newIds.push(createFileResponse.data.file.id)
                    }

                    if (newIds.length > 0) {
                        const attachResult = await getResponseBodyFromAPI({
                            routeDefinition: updateOneAgentSessionRouteDefinition,
                            body: {
                                idAgentSession: params.idAgentSession,
                                fileIds: [...existingIds, ...newIds],
                            },
                        })

                        if (!attachResult.ok) {
                            toast({ title: "Impossible d'attacher les fichiers a la session", variant: "error" })
                            return
                        }

                        await invalidateData({
                            routeDefinition: readOneAgentSessionRouteDefinition,
                            body: { idAgentSession: params.idAgentSession },
                        })
                    }

                    setPendingFiles(failedFiles)
                }

                const result = await getResponseBodyFromAPI({
                    routeDefinition: createOneAgentMessageRouteDefinition,
                    body: {
                        idOrganization: params.idOrganization,
                        idAgentSession: params.idAgentSession,
                        message: text.trim(),
                        references: references && references.length > 0 ? references : null,
                    },
                })

                if (!result.ok || !result.data) {
                    toast({ title: "Impossible de créer le message", variant: "error" })
                    return
                }

                const { id: idAgentMessage } = result.data

                setStreamMessageId(idAgentMessage)

                await invalidateData({
                    routeDefinition: readAllAgentMessagesRouteDefinition,
                    body: { idAgentSession: params.idAgentSession },
                })
                scrollToBottom()
                return true
            } catch (error) {
                console.error("[sendMessageToWorker]", error)
                toast({ title: "Une erreur est survenue lors de l'envoi du message", variant: "error" })
                return false
            } finally {
                setIsSending(false)
            }
        },
        [isSending, params.idOrganization, params.idAgentSession, pendingFiles, scrollToBottom],
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
                                                        <div key={agentMessage.id}>
                                                            <AgentMessage
                                                                agentMessage={{
                                                                    ...agentMessage,
                                                                    output: streamingContent || null,
                                                                    toolCalls:
                                                                        streamingToolCalls.length > 0
                                                                            ? streamingToolCalls
                                                                            : agentMessage.toolCalls,
                                                                }}
                                                            />
                                                            {activeSubagents.length > 0 && (
                                                                <SubagentIndicator subagents={activeSubagents} />
                                                            )}
                                                            <div className={css({ padding: "0.25rem 0.5rem" })}>
                                                                <CircularLoader />
                                                            </div>
                                                        </div>
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
                                    alignItems: "stretch",
                                    gap: "0.5rem",
                                    padding: "1rem",
                                    borderTop: "1px solid",
                                    borderTopColor: "neutral/10",
                                    backgroundColor: "white",
                                })}
                            >
                                <MentionInput
                                    onSubmit={(text, references) => {
                                        void sendMessageToWorker(text, references, {
                                            idYear: agentSession.idYear,
                                            attachedFiles: (agentSession.attachedFiles ?? []) as Array<{
                                                idFile: string
                                                name: string
                                            }>,
                                        })
                                    }}
                                    onValueChange={(text, references) => {
                                        setInput(text)
                                        setDraftReferences(references)
                                    }}
                                    disabled={isSubmitting}
                                    idOrganization={params.idOrganization}
                                    idYear={agentSession.idYear}
                                />
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    style={{ display: "none" }}
                                    accept="text/*,application/pdf,application/json,application/xml,application/csv,image/*"
                                    onChange={(event) => {
                                        const files = event.target.files
                                        if (!files || files.length === 0) return
                                        const newFiles = Array.from(files)
                                        event.target.value = ""

                                        setPendingFiles((prev) => [...prev, ...newFiles])
                                    }}
                                />
                                {/* File chips */}
                                {(() => {
                                    const sessionFiles = (agentSession.attachedFiles ?? []) as Array<{
                                        idFile: string
                                        name: string
                                    }>
                                    const hasFiles = sessionFiles.length > 0 || pendingFiles.length > 0
                                    if (!hasFiles) return null
                                    return (
                                        <div
                                            className={css({
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "0.375rem",
                                                width: "100%",
                                            })}
                                        >
                                            {sessionFiles.length > 0 && (
                                                <div
                                                    className={css({
                                                        display: "flex",
                                                        flexWrap: "wrap",
                                                        gap: "0.375rem",
                                                        width: "100%",
                                                    })}
                                                >
                                                    {sessionFiles.map((file) => (
                                                        <span
                                                            key={file.idFile}
                                                            className={css({
                                                                display: "inline-flex",
                                                                alignItems: "center",
                                                                gap: "0.25rem",
                                                                backgroundColor: "neutral/10",
                                                                border: "1px solid",
                                                                borderColor: "neutral/20",
                                                                borderRadius: "sm",
                                                                padding: "0.125rem 0.5rem",
                                                                fontSize: "xs",
                                                                color: "neutral/90",
                                                                maxWidth: "200px",
                                                            })}
                                                        >
                                                            <IconPaperclip
                                                                size={12}
                                                                className={css({ flexShrink: 0 })}
                                                            />
                                                            <span
                                                                className={css({
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    whiteSpace: "nowrap",
                                                                })}
                                                            >
                                                                {file.name}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={async () => {
                                                                    const remaining = sessionFiles.filter(
                                                                        (f) => f.idFile !== file.idFile,
                                                                    )
                                                                    const result = await getResponseBodyFromAPI({
                                                                        routeDefinition:
                                                                            updateOneAgentSessionRouteDefinition,
                                                                        body: {
                                                                            idAgentSession: params.idAgentSession,
                                                                            fileIds: remaining.map((f) => f.idFile),
                                                                        },
                                                                    })
                                                                    if (result.ok) {
                                                                        await invalidateData({
                                                                            routeDefinition:
                                                                                readOneAgentSessionRouteDefinition,
                                                                            body: {
                                                                                idAgentSession: params.idAgentSession,
                                                                            },
                                                                        })
                                                                    }
                                                                }}
                                                                className={css({
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    cursor: "pointer",
                                                                    color: "neutral/40",
                                                                    _hover: { color: "danger" },
                                                                    background: "none",
                                                                    border: "none",
                                                                    padding: 0,
                                                                    flexShrink: 0,
                                                                })}
                                                            >
                                                                <IconX size={12} />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {pendingFiles.length > 0 && (
                                                <div
                                                    className={css({
                                                        width: "100%",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "0.375rem",
                                                        padding: "0.5rem",
                                                        border: "1px solid",
                                                        borderColor: "neutral/20",
                                                        borderRadius: "md",
                                                        backgroundColor: "neutral/5",
                                                    })}
                                                >
                                                    <span
                                                        className={css({
                                                            fontSize: "xs",
                                                            color: "neutral/70",
                                                            fontWeight: "medium",
                                                        })}
                                                    >
                                                        Fichiers ajoutés: {pendingFiles.length}
                                                    </span>
                                                    <div
                                                        className={css({
                                                            display: "flex",
                                                            flexWrap: "wrap",
                                                            gap: "0.375rem",
                                                            width: "100%",
                                                        })}
                                                    >
                                                        {pendingFiles.map((file, index) => (
                                                            <span
                                                                key={`pending-${file.name}-${index}`}
                                                                className={css({
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    gap: "0.25rem",
                                                                    backgroundColor: "neutral/10",
                                                                    border: "1px solid",
                                                                    borderColor: "neutral/20",
                                                                    borderRadius: "sm",
                                                                    padding: "0.125rem 0.5rem",
                                                                    fontSize: "xs",
                                                                    color: "neutral/90",
                                                                    maxWidth: "260px",
                                                                })}
                                                            >
                                                                <IconPaperclip
                                                                    size={12}
                                                                    className={css({ flexShrink: 0 })}
                                                                />
                                                                <span
                                                                    className={css({
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                        whiteSpace: "nowrap",
                                                                    })}
                                                                >
                                                                    {file.name}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setPendingFiles((prev) =>
                                                                            prev.filter((_, i) => i !== index),
                                                                        )
                                                                    }
                                                                    className={css({
                                                                        display: "inline-flex",
                                                                        alignItems: "center",
                                                                        cursor: "pointer",
                                                                        color: "neutral/40",
                                                                        _hover: { color: "danger" },
                                                                        background: "none",
                                                                        border: "none",
                                                                        padding: 0,
                                                                        flexShrink: 0,
                                                                    })}
                                                                >
                                                                    <IconX size={12} />
                                                                </button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })()}
                                <div
                                    className={css({
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        gap: "0.5rem",
                                    })}
                                >
                                    <Popover.Root>
                                        <Popover.Trigger asChild>
                                            <Button title="Actions de la session">
                                                <ButtonGhostContent leftIcon={<IconDotsVertical />} text={undefined} />
                                            </Button>
                                        </Popover.Trigger>
                                        <Popover.Content
                                            align="end"
                                            className={css({ padding: "0.5rem", gap: "0.25rem" })}
                                        >
                                            <Popover.Close asChild>
                                                <Button
                                                    className={css({ width: "100%" })}
                                                    onClick={() => setDeleteOpen(true)}
                                                >
                                                    <ButtonGhostContent
                                                        leftIcon={<IconTrash />}
                                                        text={isDeleting ? "Suppression..." : "Supprimer la session"}
                                                        color="danger"
                                                        className={css({ width: "100%", justifyContent: "start" })}
                                                    />
                                                </Button>
                                            </Popover.Close>
                                        </Popover.Content>
                                    </Popover.Root>
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
                                        title="Fichiers joints"
                                        onClick={() => fileInputRef.current?.click()}
                                        isDisabled={isSubmitting}
                                    >
                                        <ButtonOutlineContent leftIcon={<IconPaperclip />} />
                                    </Button>
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
                                            void sendMessageToWorker(input, draftReferences, {
                                                idYear: agentSession.idYear,
                                                attachedFiles: (agentSession.attachedFiles ?? []) as Array<{
                                                    idFile: string
                                                    name: string
                                                }>,
                                            }).then((wasSent) => {
                                                if (wasSent) {
                                                    setInput("")
                                                    setDraftReferences([])
                                                    setHistoryIndex(-1)
                                                }
                                            })
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
