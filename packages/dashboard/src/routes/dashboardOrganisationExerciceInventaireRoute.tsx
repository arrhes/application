import { createRoute } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
const InventoryPage = lazy(() => import("../features/dashboard/$idYear/inventory/inventoryPage.js").then((m) => ({ default: m.InventoryPage })))
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"


function InventoryPageWrapper() {
    return <Suspense fallback={null}><InventoryPage /></Suspense>
}

export const dashboardOrganisationExerciceInventaireRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/organisation/$idOrganization/exercice/$idYear/inventaire",
    component: InventoryPageWrapper,
})
