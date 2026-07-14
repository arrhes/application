import { createRoute } from "@tanstack/react-router"
import { EntriesDashboardDocPage } from "../../../../features/docs/dashboard/EntriesDashboardDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const ecrituresGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Saisie des écritures",
        description: "Enregistrer vos opérations comptables dans Arrhes.",
    }),
    component: EntriesDashboardDocPage,
})
