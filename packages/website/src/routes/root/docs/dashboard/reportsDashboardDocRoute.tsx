import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/dashboard/ReportsDashboardDocPage.mdx"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.tsx"

export const reportsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/documents",
    beforeLoad: () => ({
        title: "Documents de synthèse",
        description:
            "Générez vos documents comptables de synthèse dans Arrhes : journal, grand livre, balance, bilan et compte de résultat.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
