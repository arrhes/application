import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/general/architecture/ArchitectureGeneralDocPage.mdx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const architectureGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/architecture",
    beforeLoad: () => ({
        title: "Architecture",
        description:
            "Vue d'ensemble de l'architecture technique d'Arrhes : Website, API, CLI et infrastructure (PostgreSQL, Stockage S3, SMTP).",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
