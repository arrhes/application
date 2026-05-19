import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const computationsApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/calculs",
    beforeLoad: () => ({
        title: "Calculs",
        description: "Endpoints API pour la gestion des calculs et formules personnalisées d'un exercice Arrhes.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/ComputationsApiDocPage.tsx"),
        "ComputationsApiDocPage",
    ),
})
