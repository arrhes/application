import { createRoute, redirect } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"

export const dashboardRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/",
    beforeLoad: ({ }) => {
        throw redirect({ to: "/dashboard/tickets" })
    },
})
