import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/api/OrgUsersApiDocPage.mdx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const orgUsersApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/membres",
    beforeLoad: () => ({
        title: "Membres",
        description: "Endpoints API pour la gestion des membres d'une organisation Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
