import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../../components/document/DocRoot"
import Content from "../../../../../features/docs/cli/commands/OrgCommandsCliDocPage.mdx"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const orgCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/organisation",
    beforeLoad: () => ({
        title: "Organisation",
        description: "Commandes de gestion de l'organisation configurée : arrhes org.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
