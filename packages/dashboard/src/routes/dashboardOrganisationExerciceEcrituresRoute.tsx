import { createRoute } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
const EntriesPage = lazy(() => import("../features/dashboard/$idYear/entries/EntriesPage.js").then((m) => ({ default: m.EntriesPage })))
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"


function EntriesPageWrapper() {
    return <Suspense fallback={null}><EntriesPage /></Suspense>
}

export const dashboardOrganisationExerciceEcrituresRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/organisation/$idOrganization/exercice/$idYear/écritures",
    component: EntriesPageWrapper,
})
