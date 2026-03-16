import { createRoute } from "@tanstack/react-router"
import { dataClient } from "../../../../../contexts/data/queryClient.js"
import { getCookie } from "../../../../../utilities/cookies/getCookie.js"
import { setCookie } from "../../../../../utilities/cookies/setCookie.js"
import { cookiePrefix } from "../../../../../utilities/variables.js"
import { organizationsLayoutRoute } from "../organizationsLayoutRoute.tsx"

export const organizationPathRoute = createRoute({
    getParentRoute: () => organizationsLayoutRoute,
    path: "/$idOrganization",
    beforeLoad: ({ params }) => {
        const previousOrganizationId = getCookie(`${cookiePrefix}_id_organization`)
        setCookie(`${cookiePrefix}_id_organization`, params.idOrganization)

        if (previousOrganizationId !== params.idOrganization) {
            dataClient.removeQueries()
        }

        return {
            title: "Organisation",
        }
    },
})
