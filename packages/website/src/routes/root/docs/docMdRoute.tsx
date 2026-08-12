import { css } from "@comptasse/ui/utilities/cn.js"
import { createRoute, notFound } from "@tanstack/react-router"
import { docsLayoutRoute } from "./docsLayoutRoute.js"

export const docMdRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "$",
    loader: async ({ location }) => {
        const path = location.pathname.replace(/\/$/, "")
        if (!path.endsWith(".md")) {
            throw notFound()
        }
        const docPath = path.replace(/\.md$/, "")
        const { getDocMdContent } = await import("virtual:doc-md-content")
        const content = await getDocMdContent(docPath)
        if (content === null) {
            throw notFound()
        }
        return content
    },
    component: function DocMdPage() {
        const content = docMdRoute.useLoaderData()

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
