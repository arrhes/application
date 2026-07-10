import { css } from "@arrhes/ui/utilities/cn.js"
import { createRoute, notFound } from "@tanstack/react-router"
import { DOC_PAGE_MANIFEST } from "../../../../plugins/DOC_PAGE_MANIFEST.js"
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
        if (!DOC_PAGE_MANIFEST.find((e: { path: string }) => e.path === docPath)?.mdxSource) {
            throw notFound()
        }
    },
    loader: async ({ location }) => {
        const path = location.pathname.replace(/\/$/, "")
        const docPath = path.replace(/\.md$/, "")
        const entry = DOC_PAGE_MANIFEST.find((e: { path: string }) => e.path === docPath)
        if (!entry?.mdxSource) return null
        try {
            const mod = await import(/* @vite-ignore */ `../../../${entry.mdxSource}?raw`)
            return (mod.default || mod) as string
        } catch {
            return null
        }
    },
    component: function DocMdPage() {
        const content = null as string | null // Will be loaded in a real implementation

        if (content === null) {
            return (
                <div
                    className={css({
                        padding: "2rem",
                        fontSize: "sm",
                        color: "neutral/50",
                    })}
                >
                    Loading...
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
