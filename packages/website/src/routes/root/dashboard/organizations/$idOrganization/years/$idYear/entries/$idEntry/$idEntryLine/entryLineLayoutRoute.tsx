import { createRoute, Outlet } from "@tanstack/react-router"
import { entryLayoutRoute } from "../entryLayoutRoute.js"

export const entryLineLayoutRoute = createRoute({
    getParentRoute: () => entryLayoutRoute,
    path: "/$idEntryLine",
    beforeLoad: () => ({
        title: "Ligne d'écriture",
    }),
    component: () => <Outlet />,
})
