import { createRoute } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
const SettingsPage = lazy(() => import("../features/dashboard/settings/SettingsPage.js").then((m) => ({ default: m.SettingsPage })))
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"


function SettingsPageWrapper() {
    return <Suspense fallback={null}><SettingsPage /></Suspense>
}

export const dashboardParametresApplicationRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/paramètres/application",
    component: SettingsPageWrapper,
})
