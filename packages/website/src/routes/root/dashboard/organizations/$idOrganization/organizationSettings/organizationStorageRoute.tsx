import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationSettingsLayoutRoute } from "./organizationSettingsLayoutRoute.js"

export const organizationStorageRoute = createRoute({
    getParentRoute: () => organizationSettingsLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Stockage",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationSettings/organizationStoragePage.js"
            ),
        "OrganizationStoragePage",
    ),
})
