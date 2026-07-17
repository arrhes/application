import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { docsLayoutRoute } from "../docsLayoutRoute.js"
import { ArchitectureGeneralDocPage } from "../../../../features/docs/general/architecture/ArchitectureGeneralDocPage.js"


export const architectureGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/architecture",
    beforeLoad: () => ({
        title: "Architecture",
        description:
            "Vue d'ensemble de l'architecture technique d'Arrhes : Website, API, CLI et infrastructure (PostgreSQL, Stockage S3, SMTP).",
    }),
    component: () => (
        <DocRoot>
            <ArchitectureGeneralDocPage />
        </DocRoot>
    ),
})
