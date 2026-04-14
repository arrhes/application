import type { readAllAgentMessagesRouteDefinition } from "@arrhes/application-metadata"
import { formatDateTime } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type { InferOutput } from "valibot"
import { AgentMessagePart } from "./agentMessagePart.tsx"
import { getAgentMessageParts } from "./getAgentMessageParts.ts"

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
