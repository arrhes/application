import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../../components/document/DocRoot"
import Content from "../../../../../features/docs/cli/commands/FichiersCommandsCliDocPage.mdx"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const fichiersCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Stockage",
        description: "Commandes de gestion des fichiers et dossiers d'un exercice : arrhes files.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
