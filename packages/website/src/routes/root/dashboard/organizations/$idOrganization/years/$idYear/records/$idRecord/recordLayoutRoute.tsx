import { createRoute, Outlet } from "@tanstack/react-router"
import { recordsLayoutRoute } from "../recordsLayoutRoute.js"

export const recordLayoutRoute = createRoute({
    getParentRoute: () => recordsLayoutRoute,
    path: "/$idRecord",
    beforeLoad: () => ({
        title: "Écriture",
    }),
    component: () => <Outlet />,
})
