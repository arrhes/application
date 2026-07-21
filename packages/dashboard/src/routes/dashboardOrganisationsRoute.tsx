import { createRoute } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
const OrganizationsPage = lazy(() => import("../features/dashboard/organizations/OrganizationsPage.js").then((m) => ({ default: m.OrganizationsPage })))
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"


function OrganizationsPageWrapper() {
    return <Suspense fallback={null}><OrganizationsPage /></Suspense>
}

export const dashboardOrganisationsRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/organisations",
    component: OrganizationsPageWrapper,
})
