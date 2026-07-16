import { createRoute } from "@tanstack/react-router"
import { DocsLayout } from "../../../features/docs/DocsLayout.js"

export const docsLayoutRoute = createRoute({
    path: "/documentation",
    component: () => <DocsLayout />,
})
