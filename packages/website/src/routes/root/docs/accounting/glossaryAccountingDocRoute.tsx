import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

export const glossaryAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/glossaire",
    beforeLoad: () => ({
        title: "Glossaire comptable",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/accounting/glossaryAccountingDocPage.tsx"),
        "GlossaryAccountingDocPage",
    ),
})
