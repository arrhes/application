import { createRoute, Outlet } from "@tanstack/react-router"
import { computationsLayoutRoute } from "../computationsLayoutRoute.js"

export const computationLayoutRoute = createRoute({
    getParentRoute: () => computationsLayoutRoute,
    path: "/$idComputation",
    beforeLoad: () => ({
        title: "Calcul",
    }),
    component: () => <Outlet />,
})
