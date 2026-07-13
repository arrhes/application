import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/accounting/introduction/RootAccountingDocPage.mdx"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

export const rootAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Cours de comptabilité",
        description:
            "Cours de comptabilité française complet : partie double, écritures, comptes, documents de synthèse et glossaire.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
