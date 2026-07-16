import { createRoute } from "@tanstack/react-router"
import { rootLayoutRoute } from "../../rootLayoutRoute.tsx"
import { DocsLayout } from "../../../features/docs/DocsLayout.js"

export const homeRootRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Arrhes",
        description:
            "Arrhes est un logiciel de comptabilité open source, moderne et intuitif, conçu pour les entreprises et associations françaises.",
    }),
    component: () => <DocsLayout />,
})
