import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/dashboard/OrganizationsDashboardDocPage.mdx"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const organizationsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/organisations",
    beforeLoad: () => ({
        title: "Organisations",
        description:
            "Gérez vos organisations dans Arrhes : création, paramétrage, gestion des membres et des abonnements.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
