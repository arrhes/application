import { createRoute } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.tsx"

// This route exists so that /dashboard/:tabId URLs are valid in the outer router.
// The DashboardLayout (parent) handles all rendering — no component needed here.
export const dashboardTabRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/$tabId",
})
