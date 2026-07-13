import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/cli/DemarrerCliDocPage.mdx"
import { cliDocLayoutRoute } from "./cliDocLayoutRoute.js"

export const demarrerCliDocRoute = createRoute({
    getParentRoute: () => cliDocLayoutRoute,
    path: "/demarrer",
    beforeLoad: () => ({
        title: "Démarrer",
        description: "Mettre en place le CLI Arrhes et effectuer votre première opération en moins de 5 minutes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
