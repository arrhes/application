import { createRoute } from "@tanstack/react-router"
import { SupportPage } from "../../../../features/dashboard/support/supportPage.js"
import { dashboardLayoutRoute } from "../dashboardLayoutRoute.js"

export const supportRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/support",
    beforeLoad: () => ({
        title: "Support",
    }),
    component: () => <SupportPage />,
})
