import {
    createOneAgentMessageRouteDefinition,
    createOneAgentSessionRouteDefinition,
    readAllAgentSessionsRouteDefinition,
    readAllYearsRouteDefinition,
} from "@arrhes/application-metadata"
import { Button, ButtonOutlineContent, ButtonPlainContent, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconSend } from "@tabler/icons-react"
import { Link, useNavigate, useParams } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import { dataClient } from "../../../../contexts/data/queryClient.js"
import { organizationPathRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationPathRoute.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { useDataFromAPI } from "../../../../utilities/useHTTPData.js"

const suggestionChips = [
    "Montre-moi mes écritures récentes",
    "Combien de comptes ai-je dans mon plan comptable ?",
    "Quels sont mes exercices ouverts ?",
]

export function AgentPage() {
    const params = useParams({ from: organizationPathRoute.id })
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // Fetch available years for the context bar
    const { data: yearsData } = useDataFromAPI({
        routeDefinition: readAllYearsRouteDefinition,
        body: {},
    })

    // Auto-select if only one year exists
    const [selectedYearId, setSelectedYearId] = useState<string | undefined>(undefined)
    const autoSelectedRef = useRef(false)
    useEffect(() => {
        if (autoSelectedRef.current || !yearsData) return
        if (yearsData.length === 1 && yearsData[0]) {
            autoSelectedRef.current = true
            setSelectedYearId(yearsData[0].id)
        }
    }, [yearsData])

    async function createNewSession(text: string) {
        if (text.trim() === "") {
            toast({ title: "Veuillez saisir une requête pour démarrer une session", variant: "warning" })
            return
        }
        if (isLoading) {
            toast({ title: "Une session est déjà en cours de création", variant: "warning" })
            return
        }
        setIsLoading(true)

        try {
            const agentSessionResponse = await getResponseBodyFromAPI({
                routeDefinition: createOneAgentSessionRouteDefinition,
                body: {
                    idOrganization: params.idOrganization,
                    message: text.trim(),
                },
            })

            if (agentSessionResponse.ok === false) {
                toast({ title: "Impossible de créer la session", variant: "error" })
                return
            }

            const agentMessageResponse = await getResponseBodyFromAPI({
                routeDefinition: createOneAgentMessageRouteDefinition,
                body: {
                    idOrganization: params.idOrganization,
                    idAgentSession: agentSessionResponse.data.id,
                    message: text.trim(),
                },
            })

            if (agentMessageResponse.ok === false) {
                toast({ title: "Impossible de créer le message", variant: "error" })
                return
            }

            // Invalidate session list so the new session appears in the sidebar
            dataClient.invalidateQueries({
                queryKey: [readAllAgentSessionsRouteDefinition.path],
                exact: false,
            })

            navigate({
                to: "/dashboard/organisations/$idOrganization/agent/sessions/$idAgentSession",
                params: { idOrganization: params.idOrganization, idAgentSession: agentSessionResponse.data.id },
            })
        }
        finally {
            setIsLoading(false)
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
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && !event.shiftKey) {
                                event.preventDefault()
                                createNewSession(input)
                            }
                        }}
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
                    <Button
                        isDisabled={isLoading}
                        onClick={(event) => {
                            event.preventDefault()
                            createNewSession(input)
                        }}
                    >
                        <ButtonPlainContent isLoading={isLoading} leftIcon={<IconSend />} />
                    </Button>
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
                {suggestionChips.map((chipText) => (
                    <Button key={chipText} onClick={() => setInput(chipText)} isDisabled={isLoading}>
                        <ButtonOutlineContent text={chipText} />
                    </Button>
                ))}
            </div>

            {/* Disclaimer */}
            <p
                className={css({
                    fontSize: "sm",
                    color: "neutral/50",
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
                    rel="noopener noreferrer"
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
