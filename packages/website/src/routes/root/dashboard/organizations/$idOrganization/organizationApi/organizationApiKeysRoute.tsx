import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationApiLayoutRoute } from "./organizationApiLayoutRoute.js"

export const organizationApiKeysRoute = createRoute({
    getParentRoute: () => organizationApiLayoutRoute,
    path: "/clés",
    beforeLoad: () => ({
        title: "Clés",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationApi/keys/organizationApiKeysPage.js"
            ),
        "OrganizationApiKeysPage",
    ),
})
