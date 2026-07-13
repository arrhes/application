import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/api/RootApiDocPage.mdx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const rootApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "API",
        description:
            "Documentation de l'API Arrhes : endpoints REST pour intégrer la comptabilité dans vos applications.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
