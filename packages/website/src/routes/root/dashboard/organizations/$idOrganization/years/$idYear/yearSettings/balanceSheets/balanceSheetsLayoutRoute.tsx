import { createRoute, Outlet } from "@tanstack/react-router"
import { yearSettingsLayoutRoute } from "../yearSettingsLayoutRoute.js"

export const balanceSheetsLayoutRoute = createRoute({
    getParentRoute: () => yearSettingsLayoutRoute,
    path: "/bilan",
    beforeLoad: () => ({
        title: "Bilan",
    }),
    component: () => <Outlet />,
})
