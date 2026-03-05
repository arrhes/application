import { createRoute, redirect } from "@tanstack/react-router"
import { computationsLayoutRoute } from "./computationsLayoutRoute.js"

export const computationsRoute = createRoute({
    getParentRoute: () => computationsLayoutRoute,
    path: "/",
    beforeLoad: ({ params }) => {
        throw redirect({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat",
            params: params,
        })
    },
})
