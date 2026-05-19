import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const exercicesCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/exercices",
    beforeLoad: () => ({
        title: "Exercices",
        description: "Commandes de gestion des exercices comptables : arrhes years list, get et create.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/cli/commands/ExercicesCommandsCliDocPage.js"),
        "ExercicesCommandsCliDocPage",
    ),
})
