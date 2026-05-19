import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const incomeStatementsApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/comptes-de-résultat",
    beforeLoad: () => ({
        title: "Comptes de résultat",
        description: "Endpoints API pour la structure du compte de résultat d'un exercice Arrhes.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/IncomeStatementsApiDocPage.tsx"),
        "IncomeStatementsApiDocPage",
    ),
})
