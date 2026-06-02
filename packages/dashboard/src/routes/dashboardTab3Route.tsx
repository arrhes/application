import { createRoute } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"

// Matches 3-segment REST paths like /organisations/{org}/exercices
export const dashboardTab3Route = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/$a/$b/$c",
})
