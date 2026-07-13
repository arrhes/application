import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/api/XBRLReportsApiDocPage.mdx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const xbrlReportsApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/exports",
    beforeLoad: () => ({
        title: "Exports",
        description: "Endpoints API pour la génération de rapports comptables XBRL (taxonomie ANC française).",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
