import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../../components/document/DocRoot"
import Content from "../../../../../features/docs/accounting/reports/ReportsAccountingDocPage.mdx"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const reportsAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Documents comptables",
        description:
            "Les documents comptables obligatoires : journal, grand livre, balance, bilan, compte de résultat et annexe.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
