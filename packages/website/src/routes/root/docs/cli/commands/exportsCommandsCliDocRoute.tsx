import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const exportsCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/exports",
    beforeLoad: () => ({
        title: "Exports",
        description: "Commandes d'export comptable : arrhes exports.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/cli/commands/ExportsCommandsCliDocPage.js"),
        "ExportsCommandsCliDocPage",
    ),
})
