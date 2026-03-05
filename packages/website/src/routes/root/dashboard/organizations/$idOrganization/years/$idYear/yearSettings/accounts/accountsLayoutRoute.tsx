import { createRoute, Outlet } from "@tanstack/react-router"
import { yearSettingsLayoutRoute } from "../yearSettingsLayoutRoute.js"

export const accountsLayoutRoute = createRoute({
    getParentRoute: () => yearSettingsLayoutRoute,
    path: "/comptes",
    beforeLoad: () => ({
        title: "Plan des comptes",
    }),
    component: () => <Outlet />,
})
