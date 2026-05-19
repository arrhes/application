import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const clesApiCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/cles-api",
    beforeLoad: () => ({
        title: "Clés API",
        description: "Commandes de gestion des clés API : arrhes api-keys.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/cli/commands/ClesApiCommandsCliDocPage.js"),
        "ClesApiCommandsCliDocPage",
    ),
})
