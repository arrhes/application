import { createRoute } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
const InventoryItemPage = lazy(() => import("../features/dashboard/$idYear/inventory/InventoryItemPage.js").then((m) => ({ default: m.InventoryItemPage })))
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"


function InventoryItemPageWrapper() {
    return <Suspense fallback={null}><InventoryItemPage /></Suspense>
}

export const dashboardOrganisationExerciceInventaireIdRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/organisation/$idOrganization/exercice/$idYear/inventaire/$idInventoryItem",
    component: InventoryItemPageWrapper,
})
