import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/cli/RootCliDocPage.mdx"
import { cliDocLayoutRoute } from "./cliDocLayoutRoute.js"

export const rootCliDocRoute = createRoute({
    getParentRoute: () => cliDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "CLI",
        description:
            "Présentation de l'interface en ligne de commande Arrhes : automatisez la gestion de votre comptabilité depuis le terminal.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
