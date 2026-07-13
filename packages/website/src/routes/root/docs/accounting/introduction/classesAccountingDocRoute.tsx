import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../../components/document/DocRoot"
import Content from "../../../../../features/docs/accounting/introduction/ClassesAccountingDocPage.mdx"
import { introductionAccountingDocLayoutRoute } from "./introductionAccountingDocLayoutRoute.tsx"

export const classesAccountingDocRoute = createRoute({
    getParentRoute: () => introductionAccountingDocLayoutRoute,
    path: "/classes",
    beforeLoad: () => ({
        title: "Classes de comptes",
        description:
            "Les 8 classes du plan comptable général français : comptes de bilan (1 à 5) et comptes de gestion (6 et 7).",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
