import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dataClient } from "../../../../contexts/data/queryClient.js"
import { getCookie } from "../../../../utilities/cookies/getCookie.js"
import { setCookie } from "../../../../utilities/cookies/setCookie.js"
import { cookiePrefix } from "../../../../utilities/variables.js"
import { agentLayoutRoute } from "./agentLayoutRoute.js"

export const agentOrganizationPathRoute = createRoute({
    getParentRoute: () => agentLayoutRoute,
    path: "/$idOrganization",
    beforeLoad: ({ params }) => {
        const previousOrganizationId = getCookie(`${cookiePrefix}_id_organization`)
        setCookie(`${cookiePrefix}_id_organization`, params.idOrganization)

        if (previousOrganizationId !== params.idOrganization) {
            dataClient.removeQueries()
        }

        return {
            title: "Assistant",
        }
    },
    component: lazyRouteComponent(() => import("../../../../features/dashboard/agent/agentPage.js"), "AgentPage"),
})
