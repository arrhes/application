import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../../../components/document/DocRoot"
import { getGlossaryTermBySlug } from "../../../../../../features/docs/accounting/resources/glossary/glossaryData.js"
import { glossaryAccountingDocLayoutRoute } from "./glossaryAccountingDocLayoutRoute.js"

const LazyGlossaryTermResourcesAccountingDocPage = lazyRouteComponent(
    () =>
        import(
            "../../../../../../features/docs/accounting/resources/glossary/GlossaryTermResourcesAccountingDocPage.tsx"
        ),
)

export const glossaryTermAccountingDocRoute = createRoute({
    getParentRoute: () => glossaryAccountingDocLayoutRoute,
    path: "/$term",
    beforeLoad: ({ params }) => {
        const entry = getGlossaryTermBySlug(params.term)
        return {
            title: entry ? `${entry.term} - Glossaire comptable` : "Glossaire comptable",
            description: entry
                ? `Définition de « ${entry.term} » : ${entry.definition.slice(0, 140)}${entry.definition.length > 140 ? "…" : ""}`
                : "Terme comptable introuvable dans le glossaire.",
        }
    },
    component: () => (
        <DocRoot>
            <LazyGlossaryTermResourcesAccountingDocPage />
        </DocRoot>
    ),
})
