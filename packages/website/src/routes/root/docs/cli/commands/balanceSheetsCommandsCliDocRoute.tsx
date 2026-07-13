import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../../components/document/DocRoot"
import Content from "../../../../../features/docs/cli/commands/BalanceSheetsCommandsCliDocPage.mdx"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const balanceSheetsCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/bilans",
    beforeLoad: () => ({
        title: "Bilans",
        description: "Commandes de gestion de la structure du bilan comptable : arrhes balance-sheets.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
