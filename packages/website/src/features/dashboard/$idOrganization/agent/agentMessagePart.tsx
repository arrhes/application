import { FormatNull } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { gfmTableFromMarkdown, gfmTableToMarkdown } from "mdast-util-gfm-table"
import { gfmTable } from "micromark-extension-gfm-table"
import Markdown from "react-markdown"
import { getAgentToolLabel } from "./agentToolsCatalog.ts"
import type { getAgentMessageParts } from "./getAgentMessageParts.ts"

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

export function AgentMessagePart(props: { part: ReturnType<typeof getAgentMessageParts>[number] }) {
    if (props.part.type === "text") {
        if (props.part.content === null) {
            return <FormatNull text="Aucun contenu à afficher" />
        }

        return (
            <div className={markdownStyles}>
                <Markdown remarkPlugins={[remarkTable]}>{props.part.content}</Markdown>
            </div>
        )
    }

    if (props.part.type === "tool-call") {
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
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                })}
            >
                <span className={css({ fontWeight: "semibold" })}>{getAgentToolLabel(props.part.name)}</span>
                {(props.part.state === "awaiting-input" || props.part.state === "input-streaming") && (
                    <span className={css({ marginLeft: "0.25rem", color: "warning" })}>en cours...</span>
                )}
                {(props.part.state === "input-complete" || props.part.state === "result") && (
                    <span className={css({ marginLeft: "0.25rem", color: "success" })}>terminé</span>
                )}
            </div>
        )
    }

    if (props.part.type === "tool-result") {
        return null
    }

    if (props.part.type === "error") {
        return (
            <div
                className={css({
                    fontSize: "sm",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "sm",
                    backgroundColor: "error/5",
                    border: "1px solid",
                    borderColor: "error/20",
                    color: "error",
                    lineHeight: "1.5",
                })}
            >
                {props.part.content ?? "Une erreur est survenue lors de la génération de la réponse."}
            </div>
        )
    }

    return null
}
