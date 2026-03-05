import { createRoute, Outlet } from "@tanstack/react-router"
import { recordLayoutRoute } from "../recordLayoutRoute.js"

export const recordRowLayoutRoute = createRoute({
    getParentRoute: () => recordLayoutRoute,
    path: "/$idRecordRow",
    beforeLoad: () => ({
        title: "Ligne d'écriture",
    }),
    component: () => <Outlet />,
})
