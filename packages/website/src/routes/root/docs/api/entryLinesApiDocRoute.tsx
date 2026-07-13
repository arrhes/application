import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/api/EntryLinesApiDocPage.mdx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const entryLinesApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/lignes",
    beforeLoad: () => ({
        title: "Lignes d'écriture",
        description: "Endpoints API pour la gestion des lignes de débit/crédit et des tags des écritures Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
