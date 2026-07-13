import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/api/FoldersApiDocPage.mdx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const foldersApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/dossiers",
    beforeLoad: () => ({
        title: "Dossiers",
        description: "Endpoints API pour la gestion des dossiers de fichiers d'un exercice Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
