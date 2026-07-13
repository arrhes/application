import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/api/TagsApiDocPage.mdx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const tagsApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/libellés",
    beforeLoad: () => ({
        title: "Libellés",
        description: "Endpoints API pour la gestion des libellés d'écriture d'un exercice Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
