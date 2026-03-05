import { createRoute, Outlet } from "@tanstack/react-router"
import { yearSettingsLayoutRoute } from "../yearSettingsLayoutRoute.js"

export const incomeStatementsLayoutRoute = createRoute({
    getParentRoute: () => yearSettingsLayoutRoute,
    path: "/compte-de-résultat",
    beforeLoad: () => ({
        title: "Compte de résultat",
    }),
    component: () => <Outlet />,
})
