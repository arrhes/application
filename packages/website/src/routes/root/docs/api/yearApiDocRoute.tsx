import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/api/YearApiDocPage.mdx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const yearApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/exercice",
    beforeLoad: () => ({
        title: "Exercice",
        description:
            "Endpoints API pour la gestion des exercices comptables : création, ouverture, clôture et consultation.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
