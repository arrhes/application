import { createRoute, Outlet } from "@tanstack/react-router"
import { yearSettingsLayoutRoute } from "../yearSettingsLayoutRoute.js"

export const journalsLayoutRoute = createRoute({
    getParentRoute: () => yearSettingsLayoutRoute,
    path: "/journaux",
    beforeLoad: () => ({
        title: "Journaux",
    }),
    component: () => <Outlet />,
})
