import { createRoute, Outlet } from "@tanstack/react-router"
import { yearLayoutRoute } from "../yearLayoutRoute.js"

export const entriesLayoutRoute = createRoute({
    getParentRoute: () => yearLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Écritures",
    }),
    component: () => <Outlet />,
})
