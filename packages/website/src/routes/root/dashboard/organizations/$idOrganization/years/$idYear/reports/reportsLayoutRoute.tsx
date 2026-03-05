import { createRoute } from "@tanstack/react-router"
import { ReportsLayout } from "../../../../../../../../features/dashboard/$idYear/reports/reportsLayout.js"
import { yearLayoutRoute } from "../yearLayoutRoute.js"

export const reportsLayoutRoute = createRoute({
    getParentRoute: () => yearLayoutRoute,
    path: "/documents",
    beforeLoad: () => ({
        title: "Documents comptables",
    }),
    component: () => <ReportsLayout />,
})
