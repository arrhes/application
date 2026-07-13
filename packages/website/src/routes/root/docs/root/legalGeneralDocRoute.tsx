import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/general/LegalGeneralDocPage.mdx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const legalGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/mentions-légales",
    beforeLoad: () => ({
        title: "Mentions légales",
        description: "Mentions légales du logiciel de comptabilité Arrhes. Informations sur l'éditeur et l'hébergeur.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
