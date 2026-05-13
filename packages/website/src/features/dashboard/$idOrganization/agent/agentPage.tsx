import {
    createOneAgentFileRouteDefinition,
    createOneAgentMessageRouteDefinition,
    createOneAgentSessionRouteDefinition,
    readAllAgentSessionsRouteDefinition,
    readAllYearsRouteDefinition,
    updateOneAgentSessionRouteDefinition,
} from "@arrhes/application-metadata"
import { Button, ButtonOutlineContent, ButtonPlainContent, InputSelect, InputTextArea, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconNotebook, IconPaperclip, IconSend, IconX } from "@tabler/icons-react"
import { Link, useNavigate, useParams } from "@tanstack/react-router"
import type { KeyboardEvent } from "react"
import { useEffect, useRef, useState } from "react"
import { Popover } from "../../../../components/overlays/popover/popover.tsx"
import { dataClient } from "../../../../contexts/data/queryClient.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { useDataFromAPI } from "../../../../utilities/useHTTPData.js"

const suggestionChips = [
    "Montre-moi mes écritures récentes",
    "Ajoute une écriture d'achat en utilisant cette facture en pièce jointe",
    "Quels sont mes exercices ouverts ?",
]

interface PendingFileItem {
    id: string
    file: File
    name: string
}

export function AgentPage({
    idOrganization: idOrganizationProp,
    onSessionCreated,
}: {
    idOrganization?: string
    onSessionCreated?: (id: string) => void
} = {}) {
    const params = useParams({
        strict: false,
    }) as {
        idOrganization?: string
    }
    const idOrganization = idOrganizationProp ?? params.idOrganization ?? ""
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
    const [customInstructions, setCustomInstructions] = useState("")
    const [pendingFiles, setPendingFiles] = useState<PendingFileItem[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const autoSelectedRef = useRef(false)
    useEffect(() => {
        if (autoSelectedRef.current || !yearsData) return
        if (yearsData.length === 1 && yearsData[0]) {
            autoSelectedRef.current = true
            setSelectedYearId(yearsData[0].id)
        }
    }, [
        yearsData,
    ])

    async function createNewSession(text: string) {
        if (text.trim() === "") {
            toast({
                title: "Veuillez saisir une requête pour démarrer une session",
                variant: "warning",
            })
            return
        }
        if (isLoading) {
            toast({
                title: "Une session est déjà en cours de création",
                variant: "warning",
            })
            return
        }
        setIsLoading(true)

        try {
            const agentSessionResponse = await getResponseBodyFromAPI({
                routeDefinition: createOneAgentSessionRouteDefinition,
                body: {
                    idOrganization: idOrganization,
                    message: text.trim(),
                    idYear: selectedYearId || null,
                    customInstructions: customInstructions.trim() || null,
                },
            })

            if (agentSessionResponse.ok === false) {
                toast({
                    title: "Impossible de créer la session",
                    variant: "error",
                })
                return
            }

            // Upload files if any
            const fileIds: string[] = []
            for (const pendingFile of pendingFiles) {
                const file = pendingFile.file
                const hashBuffer = await crypto.subtle.digest("SHA-256", await file.arrayBuffer())
                const fileHash = Array.from(new Uint8Array(hashBuffer))
                    .map((b) => b.toString(16).padStart(2, "0"))
                    .join("")

                const createFileResponse = await getResponseBodyFromAPI({
                    routeDefinition: createOneAgentFileRouteDefinition,
                    body: {
                        idOrganization: idOrganization,
                        idAgentSession: agentSessionResponse.data.id,
                        fileName: pendingFile.name,
                        fileType: file.type || "application/octet-stream",
                        fileSize: file.size,
                        fileHash,
                    },
                })

                if (createFileResponse.ok === false) {
                    toast({
                        title: `Impossible d'importer ${pendingFile.name}`,
                        variant: "error",
                    })
                    continue
                }

                // url is null when a duplicate was found — no upload needed
                if (createFileResponse.data.url) {
                    const uploadResponse = await fetch(createFileResponse.data.url, {
                        method: "PUT",
                        headers: {
                            "Content-Type": file.type || "application/octet-stream",
                        },
                        body: file,
                    })

                    if (!uploadResponse.ok) {
                        toast({
                            title: `Échec de l'envoi de ${pendingFile.name}`,
                            variant: "error",
                        })
                        continue
                    }
                }

                fileIds.push(createFileResponse.data.file.id)
            }

            // Attach files to session if any were uploaded
            if (fileIds.length > 0) {
                await getResponseBodyFromAPI({
                    routeDefinition: updateOneAgentSessionRouteDefinition,
                    body: {
                        idAgentSession: agentSessionResponse.data.id,
                        fileIds,
                    },
                })
            }

            const agentMessageResponse = await getResponseBodyFromAPI({
                routeDefinition: createOneAgentMessageRouteDefinition,
                body: {
                    idOrganization: idOrganization,
                    idAgentSession: agentSessionResponse.data.id,
                    message: text.trim(),
                },
            })

            if (agentMessageResponse.ok === false) {
                toast({
                    title: "Impossible de créer le message",
                    variant: "error",
                })
                return
            }

            // Invalidate session list so the new session appears in the sidebar
            dataClient.invalidateQueries({
                queryKey: [
                    readAllAgentSessionsRouteDefinition.path,
                ],
                exact: false,
            })

            if (onSessionCreated) {
                onSessionCreated(agentSessionResponse.data.id)
            } else {
                navigate({
                    to: "/dashboard/organisations/$idOrganization/agent/sessions/$idAgentSession",
                    params: {
                        idOrganization: idOrganization,
                        idAgentSession: agentSessionResponse.data.id,
                    },
                })
            }
        } catch (error) {
            console.error("[createNewSession]", error)
            toast({
                title: "Une erreur est survenue lors de la création de la session",
                variant: "error",
            })
        } finally {
            setIsLoading(false)
            setPendingFiles([])
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
                minHeight: 0,
                overflowY: "auto",
                width: "100%",
                height: "100%",
            })}
        >
            <div
                className={css({
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2rem",
                    maxWidth: "40rem",
                    margin: "auto",
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
                    onSubmit={(event) => {
                        event.preventDefault()
                    }}
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                    })}
                >
                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "stretch",
                            gap: "0.5rem",
                            padding: "1rem",
                            backgroundColor: "white",
                        })}
                    >
                        <InputTextArea
                            value={input}
                            onChange={(value) => setInput(value ?? "")}
                            onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
                                if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey) {
                                    event.preventDefault()
                                    createNewSession(input)
                                }
                            }}
                            placeholder="Votre message..."
                            disabled={isLoading}
                            className={css({
                                flex: 1,
                            })}
                        />
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            style={{
                                display: "none",
                            }}
                            accept="text/*,application/pdf,application/json,application/xml,application/csv,image/*"
                            onChange={(event) => {
                                const files = event.target.files
                                if (files && files.length > 0) {
                                    const localFiles = Array.from(files).map((file) => ({
                                        id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
                                        file,
                                        name: file.name,
                                    }))
                                    setPendingFiles((prev) => [
                                        ...prev,
                                        ...localFiles,
                                    ])
                                }
                                event.target.value = ""
                            }}
                        />
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
                                    {pendingFiles.map((pendingFile) => (
                                        <span
                                            key={pendingFile.id}
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
                                                className={css({
                                                    flexShrink: 0,
                                                })}
                                            />
                                            <span
                                                className={css({
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                })}
                                            >
                                                {pendingFile.name}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setPendingFiles((prev) =>
                                                        prev.filter((item) => item.id !== pendingFile.id),
                                                    )
                                                }
                                                className={css({
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                    color: "neutral/40",
                                                    _hover: {
                                                        color: "danger",
                                                    },
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
                                        <span
                                            className={css({
                                                fontSize: "xs",
                                                color: "neutral/60",
                                            })}
                                        >
                                            Ce contexte guide les réponses de l'assistant pour la session.
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
                                                value={selectedYearId}
                                                onChange={(value) => setSelectedYearId(value ?? undefined)}
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
                                                value={customInstructions}
                                                onChange={(value) => setCustomInstructions(value ?? "")}
                                                placeholder="Ex: Réponds de manière détaillée, utilise le compte 411 pour les clients..."
                                            />
                                        </div>
                                    </div>
                                </Popover.Content>
                            </Popover.Root>
                            <Button
                                type="button"
                                title="Fichiers joints"
                                onClick={(event) => {
                                    event.preventDefault()
                                    fileInputRef.current?.click()
                                }}
                                isDisabled={isLoading}
                            >
                                <ButtonOutlineContent
                                    leftIcon={<IconPaperclip />}
                                    text={pendingFiles.length > 0 ? String(pendingFiles.length) : undefined}
                                />
                            </Button>
                            <Button
                                type="button"
                                isDisabled={isLoading}
                                onClick={(event) => {
                                    event.preventDefault()
                                    createNewSession(input)
                                }}
                            >
                                <ButtonPlainContent
                                    isLoading={isLoading}
                                    leftIcon={<IconSend />}
                                    text="Envoyer"
                                />
                            </Button>
                        </div>
                    </div>
                </form>

                {/* Suggestion chips */}
                <div
                    className={css({
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.25rem",
                        justifyContent: "center",
                        width: "100%",
                    })}
                >
                    {suggestionChips.map((chipText) => (
                        <Button
                            key={chipText}
                            onClick={() => setInput(chipText)}
                            isDisabled={isLoading}
                        >
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
                            _hover: {
                                color: "primary",
                            },
                        })}
                    >
                        En savoir plus
                    </Link>
                </p>
            </div>
        </div>
    )
}
