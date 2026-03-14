import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationsLayoutRoute } from "./organizationsLayoutRoute.js"

export const organizationsRoute = createRoute({
    getParentRoute: () => organizationsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Organisations",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/dashboard/organizations/organizationsPage.js"),
        "OrganizationsPage",
    ),
})
