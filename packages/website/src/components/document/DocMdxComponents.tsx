import { css } from "@arrhes/ui/utilities/cn.js"
import type { ReactNode } from "react"
import { DocCode } from "./DocCode.js"
import { DocCodeBlock } from "./DocCodeBlock.js"
import { DocHeader } from "./DocHeader.js"
import { DocLink } from "./DocLink.js"
import { DocList } from "./DocList.js"
import { DocParagraph } from "./DocParagraph.js"
import { DocTip } from "./DocTip.js"

function extractListItems(children: ReactNode): string[] {
    const items: string[] = []
    const arr = Array.isArray(children)
        ? children
        : [
              children,
          ]
    for (const child of arr) {
        if (child && typeof child === "object" && "props" in (child as any)) {
            items.push(extractText((child as any).props.children))
        }
    }
    return items
}

function extractText(children: ReactNode): string {
    if (typeof children === "string") return children
    if (typeof children === "number") return String(children)
    if (Array.isArray(children)) return children.map(extractText).join("")
    if (children && typeof children === "object" && "props" in (children as any)) {
        return extractText((children as any).props.children)
    }
    return ""
}

export const docMdxComponents = {
    wrapper: ({ children }: { children?: ReactNode }) => <>{children}</>,

    h1: ({ children }: { children?: ReactNode }) => <DocHeader title={extractText(children)} />,

    h2: ({ children, id }: { children?: ReactNode; id?: string }) => (
        <h2
            id={id}
            className={css({
                fontSize: "1.25rem",
                fontWeight: 600,
                marginTop: "2rem",
                marginBottom: "0.75rem",
                lineHeight: 1.3,
                color: "neutral",
            })}
        >
            {children}
        </h2>
    ),

    h3: ({ children, id }: { children?: ReactNode; id?: string }) => (
        <h3
            id={id}
            className={css({
                fontSize: "1.1rem",
                fontWeight: 600,
                marginTop: "1.5rem",
                marginBottom: "0.5rem",
                lineHeight: 1.3,
                color: "neutral",
            })}
        >
            {children}
        </h3>
    ),

    p: ({ children }: { children?: ReactNode }) => <DocParagraph>{children}</DocParagraph>,

    ul: ({ children }: { children?: ReactNode }) => <DocList items={extractListItems(children)} />,

    ol: ({ children }: { children?: ReactNode }) => (
        <DocList
            variant="bullet"
            items={extractListItems(children)}
        />
    ),

    blockquote: ({ children }: { children?: ReactNode }) => <DocTip>{children}</DocTip>,

    pre: ({ children }: { children?: ReactNode }) => <DocCodeBlock>{extractText(children)}</DocCodeBlock>,

    code: ({ children }: { children?: ReactNode }) => <DocCode>{children}</DocCode>,

    table: ({ children }: { children?: ReactNode }) => {
        // Extract rows and headers from the table children
        const _headers: string[] = []
        const _rows: string[][] = []
        // Table rendering is complex in MDX — pass through as styled HTML for now
        return (
            <div
                className={css({
                    overflowX: "auto",
                    width: "100%",
                })}
            >
                <table
                    className={css({
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "sm",
                    })}
                >
                    {children}
                </table>
            </div>
        )
    },

    a: ({ children, href }: { children?: ReactNode; href?: string }) => <DocLink to={href ?? ""}>{children}</DocLink>,

    hr: () => (
        <hr
            className={css({
                border: "none",
                borderTop: "1px solid",
                borderTopColor: "neutral/10",
                margin: "2rem 0",
            })}
        />
    ),
}
