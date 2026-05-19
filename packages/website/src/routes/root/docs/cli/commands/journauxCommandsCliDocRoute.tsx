import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const journauxCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/journaux",
    beforeLoad: () => ({
        title: "Journaux",
        description: "Commandes de gestion des journaux comptables : arrhes journals.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/cli/commands/JournauxCommandsCliDocPage.js"),
        "JournauxCommandsCliDocPage",
    ),
})
