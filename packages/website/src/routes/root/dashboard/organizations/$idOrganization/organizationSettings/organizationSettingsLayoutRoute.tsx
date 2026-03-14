import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationLayoutRoute } from "../organizationLayoutRoute.js"

export const organizationSettingsLayoutRoute = createRoute({
    getParentRoute: () => organizationLayoutRoute,
    path: "/paramètres",
    beforeLoad: () => ({
        title: "Paramètres",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationSettings/organizationSettingsLayout.js"
            ),
        "OrganizationSettingsLayout",
    ),
})
