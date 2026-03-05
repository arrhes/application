import { CircularLoader } from "@arrhes/ui"
import { createRoute } from "@tanstack/react-router"
import { DocsLayout } from "../../../features/docs/docsLayout.js"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"

export const docsLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/documentation",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: () => ({
        title: "Documentation",
    }),
    component: () => <DocsLayout />,
})
