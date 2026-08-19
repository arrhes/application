import { createRoute } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
const FilesPage = lazy(() => import("../features/dashboard/$idOrganization/organizationStorage/FilesPage.js").then((m) => ({ default: m.FilesPage })))
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"


function FilesPageWrapper() {
    return <Suspense fallback={null}><FilesPage /></Suspense>
}

export const dashboardOrganisationExerciceStockageRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/organisation/$idOrganization/exercice/$idYear/stockage",
    component: FilesPageWrapper,
})
