import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const ecrituresCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/ecritures",
    beforeLoad: () => ({
        title: "Écritures",
        description: "Commandes de gestion des écritures comptables : arrhes entries list, get, create et delete.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/cli/commands/EcrituresCommandsCliDocPage.js"),
        "EcrituresCommandsCliDocPage",
    ),
})
