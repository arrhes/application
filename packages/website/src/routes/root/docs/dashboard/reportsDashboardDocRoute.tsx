import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.tsx"

export const reportsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/documents",
    beforeLoad: () => ({
        title: "Documents de synthèse",
        description:
            "Générez vos documents comptables de synthèse dans Arrhes : journal, grand livre, balance, bilan et compte de résultat.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/dashboard/ReportsDashboardDocPage.tsx"),
        "ReportsDashboardDocPage",
    ),
})
