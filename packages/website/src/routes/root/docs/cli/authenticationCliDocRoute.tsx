import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/cli/AuthenticationCliDocPage.mdx"
import { cliDocLayoutRoute } from "./cliDocLayoutRoute.js"

export const authenticationCliDocRoute = createRoute({
    getParentRoute: () => cliDocLayoutRoute,
    path: "/authentification",
    beforeLoad: () => ({
        title: "Authentification",
        description:
            "Connectez le CLI Arrhes à votre compte via une clé API et configurez votre organisation par défaut.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
