import type { AnyRoute } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"
import { dashboardRootRoute } from "./dashboardRootRoute.js"
import { dashboardTabHistoryRoute } from "./dashboardTabHistoryRoute.js"
import { dashboardTabRoute } from "./dashboardTabRoute.js"

// Only the tab-based URL pattern is needed. The inner per-tab memory routers
// handle all content routing. Classic mode has been removed.
export const fullDashboardTree: AnyRoute = dashboardLayoutRoute.addChildren([
    dashboardRootRoute,
    dashboardTabRoute,
    dashboardTabHistoryRoute,
])
