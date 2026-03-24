import { createRoute, Outlet } from "@tanstack/react-router"
import { tagsLayoutRoute } from "../tagsLayoutRoute.js"

export const tagLayoutRoute = createRoute({
    getParentRoute: () => tagsLayoutRoute,
    path: "/$idTag",
    beforeLoad: () => ({
        title: "Catégorie",
    }),
    component: () => <Outlet />,
})
