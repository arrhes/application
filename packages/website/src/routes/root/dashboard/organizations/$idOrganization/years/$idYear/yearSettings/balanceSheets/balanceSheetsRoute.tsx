import { createRoute, redirect } from "@tanstack/react-router"
import { balanceSheetsLayoutRoute } from "./balanceSheetsLayoutRoute.js"

export const balanceSheetsRoute = createRoute({
    getParentRoute: () => balanceSheetsLayoutRoute,
    path: "/",
    beforeLoad: ({ params }) => {
        throw redirect({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/bilan/actif",
            params: params,
        })
    },
})
