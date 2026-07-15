import { DOC_MD_CONTENT } from "virtual:doc-md-content"
import { css } from "@arrhes/ui/utilities/cn.js"
import { createRoute, notFound } from "@tanstack/react-router"
import { docsLayoutRoute } from "./docsLayoutRoute.js"

export const docMdRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "$",
    beforeLoad: ({ location }) => {
        const path = location.pathname.replace(/\/$/, "")
        if (!path.endsWith(".md")) {
            throw notFound()
        }
        const docPath = path.replace(/\.md$/, "")
        if (!(docPath in DOC_MD_CONTENT)) {
            throw notFound()
        }
    },
    loader: ({ location }) => {
        const path = location.pathname.replace(/\/$/, "")
        const docPath = path.replace(/\.md$/, "")
        return DOC_MD_CONTENT[docPath] ?? null
    },
    component: function DocMdPage() {
        const content = docMdRoute.useLoaderData()

        if (content === null) {
            return (
                <div
                    className={css({
                        padding: "2rem",
                        fontSize: "sm",
                        color: "neutral/50",
                    })}
                >
                    Contenu introuvable.
                </div>
            )
        }

        return (
            <pre
                className={css({
                    padding: "2rem",
                    fontSize: "sm",
                    lineHeight: "1.6",
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                })}
            >
                <code>{content}</code>
            </pre>
        )
    },
})
