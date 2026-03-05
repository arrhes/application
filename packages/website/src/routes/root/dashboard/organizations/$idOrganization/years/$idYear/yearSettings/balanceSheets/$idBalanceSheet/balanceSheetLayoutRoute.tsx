import { createRoute, Outlet } from "@tanstack/react-router"
import { balanceSheetsLayoutRoute } from "../balanceSheetsLayoutRoute.js"

export const balanceSheetLayoutRoute = createRoute({
    getParentRoute: () => balanceSheetsLayoutRoute,
    path: "/$idBalanceSheet",
    beforeLoad: () => ({
        title: "Ligne de bilan",
    }),
    component: () => <Outlet />,
})
