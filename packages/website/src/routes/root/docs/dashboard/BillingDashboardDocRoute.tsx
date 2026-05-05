import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.tsx"

export const billingDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/facturation",
    beforeLoad: () => ({
        title: "Facturation",
        description:
            "Consultez le fonctionnement de la facturation Arrhes et visualisez vos factures UBL XML dans le dashboard.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/dashboard/BillingDashboardDocPage.tsx"),
        "BillingDashboardDocPage",
    ),
})
