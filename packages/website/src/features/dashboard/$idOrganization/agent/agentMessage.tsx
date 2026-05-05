import type { readAllAgentMessagesRouteDefinition } from "@arrhes/application-metadata"
import { formatDateTime } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCalculator, IconFile, IconFileText, IconNotebook, IconPaperclip, IconTag } from "@tabler/icons-react"
import type { InferOutput } from "valibot"
import { AgentMessagePart } from "./agentMessagePart.tsx"
import { getAgentMessageParts } from "./getAgentMessageParts.ts"

const referenceTypeIcons: Record<string, typeof IconCalculator> = {
    account: IconCalculator,
    entry: IconFileText,
    journal: IconNotebook,
    tag: IconTag,
    file: IconFile,
}

/**
 * Format a Date to "HH:MM" string.
 */
function _formatTime(date: Date | undefined): string | undefined {
    if (!date || Number.isNaN(date.getTime())) return undefined
    const h = String(date.getHours()).padStart(2, "0")
    const m = String(date.getMinutes()).padStart(2, "0")
    return `${h}:${m}`
}

export function AgentMessage(props: {
    agentMessage: InferOutput<typeof readAllAgentMessagesRouteDefinition.schemas.return>[number]
}) {
    const parts = getAgentMessageParts(props.agentMessage)

    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                alignItems: "flex-start",
                width: "100%",
            })}
        >
            {/* User question */}
            <div
                className={css({
                    width: "100%",
                    flexShrink: 0,
                    padding: "0.5rem",
                    borderRadius: "sm",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "background",
                })}
            >
                <span
                    className={css({
                        fontSize: "sm",
                        color: "neutral/75",
                    })}
                >
                    {props.agentMessage.userMessage}
                </span>
                <span
                    className={css({
                        fontSize: "xs",
                        color: "neutral/50",
                    })}
                >
                    {formatDateTime(new Date(props.agentMessage.createdAt))}
                </span>
            </div>

            {Array.isArray(props.agentMessage.attachedFiles) && props.agentMessage.attachedFiles.length > 0 && (
                <div
                    className={css({
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.375rem",
                        width: "100%",
                        paddingInline: "0.5rem",
                    })}
                >
                    {(props.agentMessage.attachedFiles as Array<{ idFile: string; name: string }>).map((file) => (
                        <span
                            key={file.idFile}
                            className={css({
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.25rem",
                                fontSize: "xs",
                                color: "neutral/60",
                                backgroundColor: "neutral/5",
                                borderRadius: "sm",
                                padding: "0.125rem 0.5rem",
                            })}
                        >
                            <IconPaperclip size={12} />
                            {file.name}
                        </span>
                    ))}
                </div>
            )}

            {Array.isArray(props.agentMessage.references) && props.agentMessage.references.length > 0 && (
                <div
                    className={css({
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.375rem",
                        width: "100%",
                        paddingInline: "0.5rem",
                    })}
                >
                    {(props.agentMessage.references as Array<{ id: string; type: string; label: string }>).map(
                        (ref) => {
                            const Icon = referenceTypeIcons[ref.type] ?? IconFile
                            return (
                                <span
                                    key={ref.id}
                                    className={css({
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.25rem",
                                        fontSize: "xs",
                                        color: "primary",
                                        backgroundColor: "primary/10",
                                        borderRadius: "sm",
                                        padding: "0.125rem 0.5rem",
                                    })}
                                >
                                    <Icon size={12} />
                                    {ref.label}
                                </span>
                            )
                        },
                    )}
                </div>
            )}

            <div
                className={css({
                    width: "100%",
                    flex: 1,
                    padding: "0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    minWidth: 0,
                })}
            >
                {parts.map((part, index) => (
                    <AgentMessagePart key={`${props.agentMessage.id}-${index}`} part={part} />
                ))}
            </div>
        </div>
    )
}
