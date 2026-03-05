import { createRoute, redirect } from "@tanstack/react-router"
import { reportsLayoutRoute } from "./reportsLayoutRoute.js"

export const reportsRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/",
    beforeLoad: ({ params }) => {
        throw redirect({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/documents/livre-journal",
            params: params,
        })
    },
})
