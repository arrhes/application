import { createRoute, Outlet } from "@tanstack/react-router"
import { balanceSheetsLayoutRoute } from "../balanceSheetsLayoutRoute.js"

export const actifLayoutRoute = createRoute({
    getParentRoute: () => balanceSheetsLayoutRoute,
    path: "/actif",
    beforeLoad: () => ({
        title: "Actif",
    }),
    component: () => <Outlet />,
})
