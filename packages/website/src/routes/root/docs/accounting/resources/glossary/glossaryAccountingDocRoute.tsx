import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { glossaryAccountingDocLayoutRoute } from "./glossaryAccountingDocLayoutRoute.js"

export const glossaryAccountingDocIndexRoute = createRoute({
    getParentRoute: () => glossaryAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Glossaire comptable",
        description:
            "Glossaire de la comptabilité française : définitions claires des termes comptables essentiels, de A à Z.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../features/docs/accounting/resources/glossary/glossaryResourcesAccountingDocPage.tsx"),
        "GlossaryResourcesAccountingDocPage",
    ),
})
