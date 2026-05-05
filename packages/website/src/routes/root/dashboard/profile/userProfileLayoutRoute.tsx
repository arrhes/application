import { createRoute, Outlet } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "../dashboardLayoutRoute.js"

export const userProfileLayoutRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/profil",
    beforeLoad: () => ({
        title: "Profil",
    }),
    component: () => <Outlet />,
})
