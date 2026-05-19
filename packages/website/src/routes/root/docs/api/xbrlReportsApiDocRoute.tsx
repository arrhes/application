import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const xbrlReportsApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/exports",
    beforeLoad: () => ({
        title: "Exports",
        description: "Endpoints API pour la génération de rapports comptables XBRL (taxonomie ANC française).",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/XBRLReportsApiDocPage.tsx"),
        "XBRLReportsApiDocPage",
    ),
})
