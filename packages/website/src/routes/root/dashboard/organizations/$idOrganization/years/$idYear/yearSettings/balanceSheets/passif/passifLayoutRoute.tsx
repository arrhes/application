import { createRoute, Outlet } from "@tanstack/react-router"
import { balanceSheetsLayoutRoute } from "../balanceSheetsLayoutRoute.js"

export const passifLayoutRoute = createRoute({
    getParentRoute: () => balanceSheetsLayoutRoute,
    path: "/passif",
    beforeLoad: () => ({
        title: "Passif",
    }),
    component: () => <Outlet />,
})
