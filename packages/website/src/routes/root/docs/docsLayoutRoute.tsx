import { CircularLoader } from "@arrhes/ui"
import { createRoute } from "@tanstack/react-router"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"
import { DocsLayout } from "../../../features/docs/DocsLayout.js"

export const docsLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/documentation",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: () => ({
        title: "Documentation",
        section: "Documentation",
        description:
            "Documentation complète d'Arrhes : guide d'utilisation, cours de comptabilité, référence API et informations générales.",
    }),
    component: () => <DocsLayout />,
})
