import { createRoute, redirect } from "@tanstack/react-router"
import { adminLayoutRoute } from "./adminLayoutRoute.js"

export const adminRoute = createRoute({
    getParentRoute: () => adminLayoutRoute,
    path: "/",
    beforeLoad: () => {
        throw redirect({
            to: "/dashboard/admin/tickets",
        })
    },
})
