import { createRoute, Outlet } from "@tanstack/react-router"
import { adminLayoutRoute } from "../adminLayoutRoute.js"

export const adminTicketsLayoutRoute = createRoute({
    getParentRoute: () => adminLayoutRoute,
    path: "/tickets",
    component: () => <Outlet />,
})
