import { createRoute, redirect } from "@tanstack/react-router"
import { organizationLayoutRoute } from "./organizationLayoutRoute.tsx"

export const organizationRoute = createRoute({
    getParentRoute: () => organizationLayoutRoute,
    path: "/",
    beforeLoad: ({ params }) => {
        throw redirect({
            to: "/dashboard/organisations/$idOrganization/exercices",
            params: params,
        })
    },
})
