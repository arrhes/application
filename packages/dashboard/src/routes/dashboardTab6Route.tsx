import { createRoute } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"

// Matches 6-segment REST paths like /organisations/{org}/exercices/{year}/écritures/{idEntry}
export const dashboardTab6Route = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/$a/$b/$c/$d/$e/$f",
})
