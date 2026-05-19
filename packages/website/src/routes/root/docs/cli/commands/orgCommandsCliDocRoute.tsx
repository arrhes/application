import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const orgCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/organisation",
    beforeLoad: () => ({
        title: "Organisation",
        description: "Commandes de gestion de l'organisation configurée : arrhes org.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/cli/commands/OrgCommandsCliDocPage.js"),
        "OrgCommandsCliDocPage",
    ),
})
