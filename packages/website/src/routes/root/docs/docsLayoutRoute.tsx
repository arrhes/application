import { createRoute } from "@tanstack/react-router"
import { DocsLayout } from "../../../features/docs/DocsLayout.tsx"
import { rootLayoutRoute } from "../../rootLayoutRoute.tsx"

export const docsLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/documentation",
    component: () => <DocsLayout />,
})
