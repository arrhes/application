import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { glossaryAccountingDocLayoutRoute } from "./glossaryAccountingDocLayoutRoute.js"

export const glossaryAccountingDocIndexRoute = createRoute({
    getParentRoute: () => glossaryAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Glossaire comptable",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/glossary/glossaryAccountingDocPage.tsx"),
        "GlossaryAccountingDocPage",
    ),
})
