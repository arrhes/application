import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.tsx"

export const recordsAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Écritures comptables",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/accounting/recordsAccountingDocPage.tsx"),
        "RecordsAccountingDocPage",
    ),
})
