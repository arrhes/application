import { createRoute, Outlet } from "@tanstack/react-router"
import { yearSettingsLayoutRoute } from "../yearSettingsLayoutRoute.js"

export const tagsLayoutRoute = createRoute({
    getParentRoute: () => yearSettingsLayoutRoute,
    path: "/catégories",
    beforeLoad: () => ({
        title: "Catégories",
    }),
    component: () => <Outlet />,
})
