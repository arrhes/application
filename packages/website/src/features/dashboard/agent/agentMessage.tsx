import { css } from "@arrhes/ui/utilities/cn.js"
import { IconRobot } from "@tabler/icons-react"
import { gfmTableFromMarkdown, gfmTableToMarkdown } from "mdast-util-gfm-table"
import { gfmTable } from "micromark-extension-gfm-table"
import Markdown from "react-markdown"
import { getAgentToolLabel } from "./agentToolsCatalog.ts"

/** Minimal remark plugin: only GFM tables (no strikethrough, task lists, autolinks, footnotes). */
function remarkTable() {
    // @ts-expect-error -- unified plugin typing is loose
    const data = this.data()
    const add = (field: string, value: unknown) => {
        if (!data[field]) {
            data[field] = []
        }
        ;(data[field] as unknown[]).push(value)
    }
    add("micromarkExtensions", gfmTable())
    add("fromMarkdownExtensions", gfmTableFromMarkdown())
    add("toMarkdownExtensions", gfmTableToMarkdown())
}

interface MessagePart {
    type: string
    content?: string
    name?: string
    state?: string
    args?: unknown
    result?: unknown
}

interface Message {
    id: string
    role: string
    parts: MessagePart[]
}

const markdownStyles = css({
    fontSize: "sm",
    lineHeight: "1.6",
    color: "neutral",
    wordBreak: "break-word",
    "& p": {
        margin: "0 0 0.5rem 0",
    },
    "& p:last-child": {
        marginBottom: 0,
    },
    "& strong": {
        fontWeight: "semibold",
    },
    "& em": {
        fontStyle: "italic",
    },
    "& h1, & h2, & h3, & h4": {
        fontWeight: "semibold",
        color: "neutral",
        margin: "0.75rem 0 0.25rem 0",
    },
    "& h1": { fontSize: "lg" },
    "& h2": { fontSize: "md" },
    "& h3, & h4": { fontSize: "sm" },
    "& ul, & ol": {
        margin: "0 0 0.5rem 0",
        paddingLeft: "1.25rem",
    },
    "& li": {
        marginBottom: "0.125rem",
    },
    "& li > p": {
        margin: 0,
    },
    "& code": {
        backgroundColor: "neutral/5",
        padding: "0.125rem 0.375rem",
        borderRadius: "sm",
        fontFamily: "mono",
        fontSize: "xs",
    },
    "& pre": {
        backgroundColor: "neutral/5",
        padding: "0.75rem",
        borderRadius: "sm",
        overflowX: "auto",
        margin: "0.5rem 0",
    },
    "& pre code": {
        backgroundColor: "transparent",
        padding: 0,
        borderRadius: 0,
    },
    "& table": {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "xs",
        margin: "0.5rem 0",
    },
    "& th, & td": {
        padding: "0.375rem 0.5rem",
        borderBottom: "1px solid",
        borderColor: "neutral/10",
        textAlign: "left",
    },
    "& th": {
        fontWeight: "semibold",
        backgroundColor: "neutral/5",
    },
    "& blockquote": {
        borderLeft: "3px solid",
        borderColor: "neutral/20",
        paddingLeft: "0.75rem",
        color: "neutral/60",
        margin: "0.5rem 0",
    },
    "& a": {
        color: "primary",
        textDecoration: "underline",
    },
    "& hr": {
        border: "none",
        borderTop: "1px solid",
        borderColor: "neutral/10",
        margin: "0.75rem 0",
    },
})

/**
 * Format a Date to "HH:MM" string.
 */
function formatTime(date: Date | undefined): string | undefined {
    if (!date || Number.isNaN(date.getTime())) return undefined
    const h = String(date.getHours()).padStart(2, "0")
    const m = String(date.getMinutes()).padStart(2, "0")
    return `${h}:${m}`
}

export function AgentMessage(props: { message: Message; createdAt?: Date }) {
    const isUser = props.message.role === "user"
    const time = formatTime(props.createdAt)

    if (isUser) {
        return (
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    width: "100%",
                })}
            >
                <div
                    className={css({
                        maxWidth: "80%",
                        backgroundColor: "primary/10",
                        borderRadius: "lg",
                        borderBottomRightRadius: "sm",
                        padding: "0.5rem 0.75rem",
                    })}
                >
                    {props.message.parts.map((part, index) => (
                        <AgentMessagePart key={`${props.message.id}-${index}`} part={part} isUser />
                    ))}
                </div>
                {time && (
                    <span
                        className={css({
                            fontSize: "xs",
                            color: "neutral/30",
                            marginTop: "0.125rem",
                        })}
                    >
                        {time}
                    </span>
                )}
            </div>
        )
    }

    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "flex-start",
                width: "100%",
            })}
        >
            <div
                className={css({
                    flexShrink: 0,
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "md",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "neutral/10",
                    color: "neutral",
                    marginTop: "0.125rem",
                })}
            >
                <IconRobot size={14} />
            </div>
            <div
                className={css({
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    minWidth: 0,
                })}
            >
                {props.message.parts.map((part, index) => (
                    <AgentMessagePart key={`${props.message.id}-${index}`} part={part} isUser={false} />
                ))}
                {time && (
                    <span
                        className={css({
                            fontSize: "xs",
                            color: "neutral/30",
                            marginTop: "0.125rem",
                        })}
                    >
                        {time}
                    </span>
                )}
            </div>
        </div>
    )
}

function AgentMessagePart(props: { part: MessagePart; isUser: boolean }) {
    const { part, isUser } = props

    if (part.type === "text" && part.content) {
        // User messages: plain text. Assistant messages: markdown.
        if (isUser) {
            return (
                <div
                    className={css({
                        fontSize: "sm",
                        lineHeight: "1.5",
                        color: "neutral",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                    })}
                >
                    {part.content}
                </div>
            )
        }

        return (
            <div className={markdownStyles}>
                <Markdown remarkPlugins={[remarkTable]}>{part.content}</Markdown>
            </div>
        )
    }

    if (part.type === "tool-call") {
        return (
            <div
                className={css({
                    fontSize: "xs",
                    padding: "0.375rem 0.5rem",
                    borderRadius: "sm",
                    backgroundColor: "neutral/5",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    color: "neutral/60",
                    fontFamily: "mono",
                })}
            >
                <span className={css({ fontWeight: "semibold" })}>{getAgentToolLabel(part.name)}</span>
                {(part.state === "awaiting-input" || part.state === "input-streaming") && (
                    <span className={css({ marginLeft: "0.25rem", color: "warning" })}>en cours...</span>
                )}
                {(part.state === "input-complete" || part.state === "result") && (
                    <span className={css({ marginLeft: "0.25rem", color: "success" })}>terminé</span>
                )}
            </div>
        )
    }

    if (part.type === "tool-result") {
        return null
    }

    return null
}
