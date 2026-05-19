import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const incomeStatementsCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/comptes-de-resultat",
    beforeLoad: () => ({
        title: "Comptes de résultat",
        description:
            "Commandes de gestion de la structure du compte de résultat et des calculs : arrhes income-statements.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/cli/commands/IncomeStatementsCommandsCliDocPage.js"),
        "IncomeStatementsCommandsCliDocPage",
    ),
})
