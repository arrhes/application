import { createRoute, Outlet } from "@tanstack/react-router"
import { entriesLayoutRoute } from "../entriesLayoutRoute.js"

export const entryLayoutRoute = createRoute({
    getParentRoute: () => entriesLayoutRoute,
    path: "/$idEntry",
    beforeLoad: () => ({
        title: "Écriture",
    }),
    component: () => <Outlet />,
})
