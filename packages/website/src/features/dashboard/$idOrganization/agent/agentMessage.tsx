import { readAllAgentMessagesRouteDefinition } from "@arrhes/application-metadata"
import { formatDateTime } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconRobot, IconUser } from "@tabler/icons-react"
import { InferOutput } from "valibot"
import { AgentMessagePart } from "./agentMessagePart.tsx"
import { getAgentMessageParts } from "./getAgentMessageParts.ts"

/**
 * Format a Date to "HH:MM" string.
 */
function formatTime(date: Date | undefined): string | undefined {
    if (!date || Number.isNaN(date.getTime())) return undefined
    const h = String(date.getHours()).padStart(2, "0")
    const m = String(date.getMinutes()).padStart(2, "0")
    return `${h}:${m}`
}

export function AgentMessage(props: { agentMessage: (InferOutput<typeof readAllAgentMessagesRouteDefinition.schemas.return>)[number] }) {
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
                <div
                    className={css({
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
                >
                    {
                        props.agentMessage.role === "assistant" ? (
                            <IconRobot
                                size={16}
                                className={css({
                                    stroke: "neutral/50",
                                })}
                            />
                        ) : (
                            <IconUser
                                size={16}
                                className={css({
                                    stroke: "neutral/50",
                                })}
                            />
                        )
                    }
                    <span
                        className={css({
                            fontSize: "xs",
                            color: "neutral/75",
                        })}
                    >
                        {
                            props.agentMessage.role === "assistant"
                                ? "Assistant"
                                : "User"
                        }
                    </span>
                </div>
                <span
                    className={css({
                        fontSize: "xs",
                        color: "neutral/50",
                    })}
                >
                    {formatDateTime(new Date(props.agentMessage.createdAt))}
                </span>
            </div>
            <div
                className={css({
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
