import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/dashboard/RootDashboardDocPage.mdx"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.tsx"

export const rootDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Guide d'utilisation",
        description:
            "Guide d'utilisation du dashboard Arrhes : créez vos organisations, gérez vos exercices et saisissez vos écritures comptables.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
