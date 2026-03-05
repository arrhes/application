import { createRoute, Outlet } from "@tanstack/react-router"
import { filesLayoutRoute } from "../filesLayoutRoute.js"

export const fileLayoutRoute = createRoute({
    getParentRoute: () => filesLayoutRoute,
    path: "/$idFile",
    beforeLoad: () => ({
        title: "Pièce justificative",
    }),
    component: () => <Outlet />,
})
