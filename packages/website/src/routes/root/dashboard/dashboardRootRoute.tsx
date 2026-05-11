import { createRoute, redirect } from "@tanstack/react-router"
import { getCookie } from "../../../utilities/cookies/getCookie.js"
import { cookiePrefix } from "../../../utilities/variables.js"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"

export const dashboardRootRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/",
    beforeLoad: () => {
        const storedOrganizationId = getCookie(`${cookiePrefix}_id_organization`)
        if (storedOrganizationId) {
            throw redirect({
                to: "/dashboard/organisations/$idOrganization",
                params: {
                    idOrganization: storedOrganizationId,
                },
            })
        }
        throw redirect({
            to: "/dashboard/organisations",
        })
    },
    component: () => {},
})
