import { CircularLoader } from "@arrhes/ui"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"

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
    component: lazyRouteComponent(() => import("../../../features/docs/docsLayout.js"), "DocsLayout"),
})
