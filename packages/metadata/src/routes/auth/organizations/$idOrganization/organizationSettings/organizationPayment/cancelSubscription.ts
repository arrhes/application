import * as v from "valibot"
import { routePath } from "../../../../../../components/index.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"

export const cancelSubscriptionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/cancel-subscription`,
    schemas: {
        body: v.object({}),
        return: v.object({}),
    },
})
