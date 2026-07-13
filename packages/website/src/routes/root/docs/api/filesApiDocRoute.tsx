import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/api/FilesApiDocPage.mdx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const filesApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Fichiers et documents",
        description:
            "Endpoints API pour la gestion des fichiers et documents : upload, téléchargement et association aux écritures.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
