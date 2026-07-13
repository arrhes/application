import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/dashboard/GettingStartedDashboardDocPage.mdx"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.tsx"

export const gettingStartedDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/démarrage",
    beforeLoad: () => ({
        title: "Démarrage",
        description:
            "Guide de démarrage rapide d'Arrhes : créez votre compte, configurez votre première organisation et commencez votre comptabilité.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
