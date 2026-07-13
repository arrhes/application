import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../../components/document/DocRoot"
import Content from "../../../../../features/docs/cli/commands/IncomeStatementsCommandsCliDocPage.mdx"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const incomeStatementsCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/comptes-de-resultat",
    beforeLoad: () => ({
        title: "Comptes de résultat",
        description:
            "Commandes de gestion de la structure du compte de résultat et des calculs : arrhes income-statements.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
