import { createRoute } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"

// This route exists so that /:tabId URLs are valid in the outer router.
// The DashboardLayout (parent) handles all rendering — no component needed here.
export const dashboardTabRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/$tabId",
})
