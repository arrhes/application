import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/dashboard/EntriesDashboardDocPage.mdx"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const entriesDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Écritures",
        description:
            "Saisissez et gérez vos écritures comptables dans Arrhes : création, modification, suppression et recherche d'écritures.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
