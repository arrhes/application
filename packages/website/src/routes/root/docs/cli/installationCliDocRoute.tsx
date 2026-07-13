import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/cli/InstallationCliDocPage.mdx"
import { cliDocLayoutRoute } from "./cliDocLayoutRoute.js"

export const installationCliDocRoute = createRoute({
    getParentRoute: () => cliDocLayoutRoute,
    path: "/installation",
    beforeLoad: () => ({
        title: "Installation",
        description: "Installez le CLI Arrhes sur macOS et Linux en une commande. Seul curl est requis.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
