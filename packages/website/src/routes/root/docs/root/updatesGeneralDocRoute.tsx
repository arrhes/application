import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { UpdatesGeneralDocPage } from "../../../../features/docs/project/UpdatesGeneralDocPage.js"
import { docsLayoutRoute } from "../docsLayoutRoute.js"

export const updatesGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/mises-à-jour",
    beforeLoad: () => ({
        title: "Mises à jour",
        description:
            "Suivez l'évolution de Comptasse et consultez l'historique des versions publiées sur GitHub Releases.",
    }),
    component: () => (
        <DocRoot>
            <UpdatesGeneralDocPage />
        </DocRoot>
    ),
})
