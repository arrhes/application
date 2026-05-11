import { createRoute } from "@tanstack/react-router"
import { UpdatesDashboardDocPage } from "../../../../features/docs/dashboard/UpdatesDashboardDocPage.js"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const updatesDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/màj",
    beforeLoad: () => ({
        title: "Mises à jour",
        description: "Suivez l'évolution d'Arrhes et consultez l'historique des versions publiées sur GitHub Releases.",
    }),
    component: UpdatesDashboardDocPage,
})
