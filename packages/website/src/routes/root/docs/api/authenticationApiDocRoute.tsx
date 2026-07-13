import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/api/AuthenticationApiDocPage.mdx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const authenticationApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/authentification",
    beforeLoad: () => ({
        title: "Authentification et utilisateurs",
        description:
            "Authentification à l'API Arrhes : gestion des clés API, sessions utilisateurs et sécurité des requêtes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
