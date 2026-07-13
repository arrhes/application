import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/api/IntroductionApiDocPage.mdx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const introductionApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/introduction",
    beforeLoad: () => ({
        title: "Introduction",
        description:
            "Introduction à l'API Arrhes : authentification, format des requêtes, gestion des erreurs et bonnes pratiques.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
