import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/api/OrganizationApiDocPage.mdx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const organizationApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/organisation",
    beforeLoad: () => ({
        title: "Organisation",
        description:
            "Endpoints API pour la gestion des organisations Arrhes : création, lecture, mise à jour et suppression.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
