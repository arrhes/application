import { createRoute } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
const OrganizationStoragePage = lazy(() => import("../features/dashboard/$idOrganization/organizationStorage/OrganizationStoragePage.js").then((m) => ({ default: m.OrganizationStoragePage })))
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"


function OrganizationStoragePageWrapper() {
    return <Suspense fallback={null}><OrganizationStoragePage /></Suspense>
}

export const dashboardOrganisationStockageRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/organisation/$idOrganization/stockage",
    component: OrganizationStoragePageWrapper,
})
