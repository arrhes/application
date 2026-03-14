import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationSettingsLayoutRoute } from "./organizationSettingsLayoutRoute.js"

export const organizationSettingsRoute = createRoute({
    getParentRoute: () => organizationSettingsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationSettings/organizationSettingsPage.js"
            ),
        "OrganizationSettingsPage",
    ),
})
