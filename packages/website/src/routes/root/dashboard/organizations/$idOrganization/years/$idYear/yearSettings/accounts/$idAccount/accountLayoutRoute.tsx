import { createRoute, Outlet } from "@tanstack/react-router"
import { accountsLayoutRoute } from "../accountsLayoutRoute.js"

export const accountLayoutRoute = createRoute({
    getParentRoute: () => accountsLayoutRoute,
    path: "/$idAccount",
    beforeLoad: () => ({
        title: "Compte",
    }),
    component: () => <Outlet />,
})
