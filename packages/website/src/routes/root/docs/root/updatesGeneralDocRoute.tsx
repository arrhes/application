import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { docsLayoutRoute } from "../docsLayoutRoute.js"
import { UpdatesGeneralDocPage } from "../../../../features/docs/general/UpdatesGeneralDocPage.js"


export const updatesGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/mises-à-jour",
    beforeLoad: () => ({
        title: "Mises à jour",
        description: "Suivez l'évolution d'Arrhes et consultez l'historique des versions publiées sur GitHub Releases.",
    }),
    component: () => (
        <DocRoot>
            <UpdatesGeneralDocPage />
        </DocRoot>
    ),
})
