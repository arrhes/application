import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/general/UpdatesGeneralDocPage.mdx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.js"

export const updatesGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/mises-à-jour",
    beforeLoad: () => ({
        title: "Mises à jour",
        description: "Suivez l'évolution d'Arrhes et consultez l'historique des versions publiées sur GitHub Releases.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
