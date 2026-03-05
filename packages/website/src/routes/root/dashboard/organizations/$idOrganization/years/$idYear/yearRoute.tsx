import { createRoute, redirect } from "@tanstack/react-router"
import { yearLayoutRoute } from "./yearLayoutRoute.tsx"

export const yearRoute = createRoute({
    getParentRoute: () => yearLayoutRoute,
    path: "/",
    beforeLoad: ({ params }) => {
        throw redirect({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures",
            params: params,
        })
    },
})
