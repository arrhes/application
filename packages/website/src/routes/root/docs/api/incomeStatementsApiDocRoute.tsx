import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/api/IncomeStatementsApiDocPage.mdx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const incomeStatementsApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/comptes-de-résultat",
    beforeLoad: () => ({
        title: "Comptes de résultat",
        description: "Endpoints API pour la structure du compte de résultat d'un exercice Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
