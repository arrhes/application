import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/api/ApiKeysApiDocPage.mdx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const apiKeysApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/clés-api",
    beforeLoad: () => ({
        title: "Clés API",
        description: "Endpoints API pour la gestion des clés d'accès programmatique à l'API Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
