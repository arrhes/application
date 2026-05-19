import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const libellesCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/libelles",
    beforeLoad: () => ({
        title: "Libellés",
        description: "Commandes de gestion des libellés (tags) : arrhes tags.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/cli/commands/LibellesCommandsCliDocPage.js"),
        "LibellesCommandsCliDocPage",
    ),
})
