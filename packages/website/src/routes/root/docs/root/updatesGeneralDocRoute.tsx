import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { UpdatesGeneralDocPage } from "../../../../features/docs/general/UpdatesGeneralDocPage.tsx"
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
            <UpdatesGeneralDocPage />
        </DocRoot>
    ),
})
