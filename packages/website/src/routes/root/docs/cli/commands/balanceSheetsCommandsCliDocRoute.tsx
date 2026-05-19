import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const balanceSheetsCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/bilans",
    beforeLoad: () => ({
        title: "Bilans",
        description: "Commandes de gestion de la structure du bilan comptable : arrhes balance-sheets.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/cli/commands/BalanceSheetsCommandsCliDocPage.js"),
        "BalanceSheetsCommandsCliDocPage",
    ),
})
