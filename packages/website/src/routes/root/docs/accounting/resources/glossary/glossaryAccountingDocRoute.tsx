import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../../../components/document/DocRoot"
import { glossaryAccountingDocLayoutRoute } from "./glossaryAccountingDocLayoutRoute.js"

const LazyGlossaryResourcesAccountingDocPage = lazyRouteComponent(
    () =>
        import("../../../../../../features/docs/accounting/resources/glossary/GlossaryResourcesAccountingDocPage.tsx"),
)

export const glossaryAccountingDocIndexRoute = createRoute({
    getParentRoute: () => glossaryAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Glossaire comptable",
        description:
            "Glossaire de la comptabilité française : définitions claires des termes comptables essentiels, de A à Z.",
    }),
    component: () => (
        <DocRoot>
            <LazyGlossaryResourcesAccountingDocPage />
        </DocRoot>
    ),
})
