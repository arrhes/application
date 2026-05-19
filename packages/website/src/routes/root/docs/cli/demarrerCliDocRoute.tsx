import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { cliDocLayoutRoute } from "./cliDocLayoutRoute.js"

export const demarrerCliDocRoute = createRoute({
    getParentRoute: () => cliDocLayoutRoute,
    path: "/demarrer",
    beforeLoad: () => ({
        title: "Démarrer",
        description: "Mettre en place le CLI Arrhes et effectuer votre première opération en moins de 5 minutes.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/cli/DemarrerCliDocPage.js"),
        "DemarrerCliDocPage",
    ),
})
