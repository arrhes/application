import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const comptesCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/comptes",
    beforeLoad: () => ({
        title: "Comptes",
        description: "Commandes de gestion du plan comptable : arrhes accounts.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/cli/commands/ComptesCommandsCliDocPage.js"),
        "ComptesCommandsCliDocPage",
    ),
})
