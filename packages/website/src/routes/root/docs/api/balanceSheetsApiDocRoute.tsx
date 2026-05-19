import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const balanceSheetsApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/bilans",
    beforeLoad: () => ({
        title: "Bilans",
        description: "Endpoints API pour la structure du bilan comptable d'un exercice Arrhes.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/BalanceSheetsApiDocPage.tsx"),
        "BalanceSheetsApiDocPage",
    ),
})
