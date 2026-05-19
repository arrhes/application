import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const signOutRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/auth/sign-out`,
    schemas: {
        body: v.object({}),
        return: v.object({}),
    },
})
