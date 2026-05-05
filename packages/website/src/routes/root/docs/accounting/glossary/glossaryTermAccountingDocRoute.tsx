import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { getGlossaryTermBySlug } from "../../../../../features/docs/accounting/glossary/glossaryData.js"
import { glossaryAccountingDocLayoutRoute } from "./glossaryAccountingDocLayoutRoute.js"

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
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/glossary/glossaryTermAccountingDocPage.tsx"),
        "GlossaryTermAccountingDocPage",
    ),
})
