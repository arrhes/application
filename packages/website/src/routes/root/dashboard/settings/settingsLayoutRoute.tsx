import { createRoute, Outlet } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "../dashboardLayoutRoute.js"

export const settingsLayoutRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/paramètres",
    beforeLoad: () => ({
        title: "Paramètres",
    }),
    component: () => <Outlet />,
})
