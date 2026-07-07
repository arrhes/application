import { createRoute } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"

// Matches 5-segment REST paths like /organisations/{org}/exercices/{year}/écritures
export const dashboardTab5Route = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/$a/$b/$c/$d/$e",
})
