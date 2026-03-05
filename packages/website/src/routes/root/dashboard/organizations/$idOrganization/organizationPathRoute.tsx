import { createRoute } from "@tanstack/react-router"
import { setCookie } from "../../../../../utilities/cookies/setCookie.js"
import { cookiePrefix } from "../../../../../utilities/variables.js"
import { organizationsLayoutRoute } from "../organizationsLayoutRoute.tsx"

export const organizationPathRoute = createRoute({
    getParentRoute: () => organizationsLayoutRoute,
    path: "/$idOrganization",
    beforeLoad: ({ params }) => {
        setCookie(`${cookiePrefix}_id_organization`, params.idOrganization)
        return {
            title: "Organisation",
        }
    },
})
