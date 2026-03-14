import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationSettingsLayoutRoute } from "./organizationSettingsLayoutRoute.js"

export const organizationSecurityRoute = createRoute({
    getParentRoute: () => organizationSettingsLayoutRoute,
    path: "/sécurité",
    beforeLoad: () => ({
        title: "Sécurité",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationSettings/organizationSecurityPage.js"
            ),
        "OrganizationSecurityPage",
    ),
})
