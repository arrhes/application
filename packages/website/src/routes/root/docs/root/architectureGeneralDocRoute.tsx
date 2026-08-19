import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { ArchitectureGeneralDocPage } from "../../../../features/docs/project/architecture/ArchitectureGeneralDocPage.js"
import { docsLayoutRoute } from "../docsLayoutRoute.js"

export const architectureGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/architecture",
    beforeLoad: () => ({
        title: "Architecture",
        description:
            "Vue d'ensemble de l'architecture technique de Comptasse : Website, API, CLI et infrastructure (PostgreSQL, Stockage S3).",
    }),
    component: () => (
        <DocRoot>
            <ArchitectureGeneralDocPage />
        </DocRoot>
    ),
})
