import type { AnyRoute } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.tsx"
import { dashboardTabRoute } from "./dashboardTabRoute.tsx"

// The dashboard tab shell handles all internal routing via per-tab memory routers.
// dashboardTabRoute (/$tabId) ensures /dashboard/:id URLs don't fall through to the catch route.
export const dashboardTree: AnyRoute = dashboardLayoutRoute.addChildren([
    dashboardTabRoute,
])
