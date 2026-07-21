import { createRoute } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
const InventoryCategoriesPage = lazy(() => import("../features/dashboard/$idYear/inventory/inventoryCategoriesPage.js").then((m) => ({ default: m.InventoryCategoriesPage })))
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"


function InventoryCategoriesPageWrapper() {
    return <Suspense fallback={null}><InventoryCategoriesPage /></Suspense>
}

export const dashboardOrganisationExerciceInventaireCategoriesRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/organisation/$idOrganization/exercice/$idYear/inventaire/catégories",
    component: InventoryCategoriesPageWrapper,
})
