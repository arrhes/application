import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.js"

const LazyUpdatesGeneralDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/general/UpdatesGeneralDocPage.tsx"),
)

export const updatesGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/mises-à-jour",
    beforeLoad: () => ({
        title: "Mises à jour",
        description: "Suivez l'évolution d'Arrhes et consultez l'historique des versions publiées sur GitHub Releases.",
    }),
    component: () => (
        <DocRoot>
            <LazyUpdatesGeneralDocPage />
        </DocRoot>
    ),
})
