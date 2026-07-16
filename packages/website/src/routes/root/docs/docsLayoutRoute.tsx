import { createRoute } from "@tanstack/react-router"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"
import { DocsLayout } from "../../../features/docs/DocsLayout.js"

export const docsLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/documentation",
    component: () => <DocsLayout />,
})
