import {
    createOneAgentSessionRouteDefinition,
    readAllAgentSessionsRouteDefinition,
    readAllYearsRouteDefinition,
} from "@arrhes/application-metadata"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconSend } from "@tabler/icons-react"
import { Link, useNavigate, useParams } from "@tanstack/react-router"
import { useEffect, useMemo, useRef, useState } from "react"
import { dataClient } from "../../../contexts/data/queryClient.js"
import { organizationPathRoute } from "../../../routes/root/dashboard/organizations/$idOrganization/organizationPathRoute.tsx"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.js"
import { useDataFromAPI } from "../../../utilities/useHTTPData.js"
import { setPendingAgentMessage, useAgentActiveSession } from "./agentActiveSessionContext.tsx"

const suggestionChips = [
    "Montre-moi mes écritures récentes",
    "Combien de comptes ai-je dans mon plan comptable ?",
    "Génère le journal du mois en cours",
    "Quels sont mes exercices ouverts ?",
]

export function AgentNewSessionPage() {
    const { idOrganization } = useParams({ from: organizationPathRoute.id })
    const { setActiveSessionId } = useAgentActiveSession()
    const navigate = useNavigate()
    const [input, setInput] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    // Fetch available years for auto-selection
    const { data: yearsData } = useDataFromAPI({
        routeDefinition: readAllYearsRouteDefinition,
        body: {},
    })

    // Auto-select year if only one
    const autoYearId = useMemo(() => {
        if (yearsData?.length === 1 && yearsData[0]) return yearsData[0].id
        return undefined
    }, [yearsData])

    // Auto-focus input on mount
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (input.trim() === "" || isSubmitting) return
        sendFirstMessage(input.trim())
    }

    async function sendFirstMessage(text: string) {
        setIsSubmitting(true)

        // Create a new empty session via the standard API endpoint.
        // No LLM call happens here — just session creation.
        // AgentChat will send the first message via useChat for the full round-trip.
        const result = await getResponseBodyFromAPI({
            routeDefinition: createOneAgentSessionRouteDefinition,
            body: { idOrganization },
        })

        if (!result.ok || !result.data) {
            setIsSubmitting(false)
            return
        }

        const idAgentSession = result.data.id

        // Invalidate session list so the new session appears in the sidebar
        dataClient.invalidateQueries({
            queryKey: [readAllAgentSessionsRouteDefinition.path],
            exact: false,
        })

        // Store the first message and year in module-level store
        // so AgentChat can pick it up on mount (avoids React state
        // batching timing issues with context)
        setPendingAgentMessage(text, autoYearId)
        setActiveSessionId(idAgentSession)

        // Navigate to the session route
        navigate({
            to: "/dashboard/organisations/$idOrganization/agent/$idAgentSession",
            params: { idOrganization, idAgentSession },
        })
    }

    function handleChipClick(text: string) {
        setInput(text)
        sendFirstMessage(text)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            if (input.trim() !== "" && !isSubmitting) {
                sendFirstMessage(input.trim())
            }
        }
    }

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
                onSubmit={handleSubmit}
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
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Votre message..."
                        disabled={isSubmitting}
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
                            _disabled: {
                                opacity: 0.5,
                                cursor: "not-allowed",
                            },
                            _placeholder: { color: "neutral/30" },
                        })}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting || input.trim() === ""}
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
                        disabled={isSubmitting}
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
                            _hover: {
                                borderColor: "primary/30",
                                color: "primary",
                                backgroundColor: "primary/5",
                            },
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
                L'assistant peut faire des erreurs. Verifiez les informations importantes.{" "}
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
