import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../../components/document/DocRoot"
import Content from "../../../../../features/docs/cli/commands/ExercicesCommandsCliDocPage.mdx"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"

export const exercicesCommandsCliDocRoute = createRoute({
    getParentRoute: () => commandsCliDocLayoutRoute,
    path: "/exercices",
    beforeLoad: () => ({
        title: "Exercices",
        description: "Commandes de gestion des exercices comptables : arrhes years list, get et create.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
