import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/api/EntriesApiDocPage.mdx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const entriesApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Écritures",
        description: "Endpoints API pour la gestion des écritures comptables d'un exercice Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
