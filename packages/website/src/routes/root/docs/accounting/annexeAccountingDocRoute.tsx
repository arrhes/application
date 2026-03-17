import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const annexeAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/annexe",
    beforeLoad: () => ({
        title: "Annexe comptable",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/accounting/reports/annexePage.tsx"),
        "AnnexePage",
    ),
})
