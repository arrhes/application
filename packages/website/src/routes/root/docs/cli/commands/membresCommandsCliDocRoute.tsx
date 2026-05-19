import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const membresCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/membres",
    beforeLoad: () => ({
        title: "Membres",
        description: "Commandes de gestion des membres d'une organisation : arrhes members.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/cli/commands/MembresCommandsCliDocPage.js"),
        "MembresCommandsCliDocPage",
    ),
})
