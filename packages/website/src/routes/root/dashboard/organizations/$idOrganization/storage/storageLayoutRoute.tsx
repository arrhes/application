import { createRoute, Outlet } from "@tanstack/react-router"
import { organizationLayoutRoute } from "../organizationLayoutRoute.js"

export const storageLayoutRoute = createRoute({
    getParentRoute: () => organizationLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Stockage",
    }),
    component: () => <Outlet />,
})
