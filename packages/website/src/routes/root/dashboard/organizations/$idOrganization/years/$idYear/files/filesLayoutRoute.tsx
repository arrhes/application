import { createRoute, Outlet } from "@tanstack/react-router"
import { yearLayoutRoute } from "../yearLayoutRoute.js"

export const filesLayoutRoute = createRoute({
    getParentRoute: () => yearLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Stockage",
    }),
    component: () => <Outlet />,
})
