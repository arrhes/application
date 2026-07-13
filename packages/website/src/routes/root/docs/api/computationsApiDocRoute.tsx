import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/api/ComputationsApiDocPage.mdx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const computationsApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/calculs",
    beforeLoad: () => ({
        title: "Calculs",
        description: "Endpoints API pour la gestion des calculs et formules personnalisées d'un exercice Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
