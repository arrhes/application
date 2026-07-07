import { createRoute } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"

// Matches 4-segment REST paths like /organisations/{org}/exercices/{year}
export const dashboardTab4Route = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/$a/$b/$c/$d",
})
