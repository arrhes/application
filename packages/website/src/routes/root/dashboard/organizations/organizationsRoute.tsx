import { createRoute } from "@tanstack/react-router"
import { OrganizationsPage } from "../../../../features/dashboard/organizations/organizationsPage.js"
import { organizationsLayoutRoute } from "./organizationsLayoutRoute.js"

export const organizationsRoute = createRoute({
    getParentRoute: () => organizationsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Organisations",
    }),
    component: () => <OrganizationsPage />,
})
