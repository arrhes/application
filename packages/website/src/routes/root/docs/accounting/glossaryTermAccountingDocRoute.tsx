import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { glossaryAccountingDocLayoutRoute } from "./glossaryAccountingDocLayoutRoute.js"

export const glossaryTermAccountingDocRoute = createRoute({
    getParentRoute: () => glossaryAccountingDocLayoutRoute,
    path: "/$term",
    beforeLoad: () => ({
        title: "Glossaire comptable",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/accounting/glossary/glossaryTermPage.tsx"),
        "GlossaryTermPage",
    ),
})
