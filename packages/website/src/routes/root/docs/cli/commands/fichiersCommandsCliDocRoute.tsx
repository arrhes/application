import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const fichiersCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Stockage",
        description: "Commandes de gestion des fichiers et dossiers d'un exercice : arrhes files.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/cli/commands/FichiersCommandsCliDocPage.js"),
        "FichiersCommandsCliDocPage",
    ),
})
