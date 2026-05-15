import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const reportsAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Documents comptables",
        description:
            "Les documents comptables obligatoires : journal, grand livre, balance, bilan, compte de résultat et annexe.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/reports/ReportsAccountingDocPage.tsx"),
        "ReportsAccountingDocPage",
    ),
})
