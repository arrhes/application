import * as v from "valibot"
import { routePath } from "../../components/index.js"
import { routeDefinition } from "../../utilities/routeDefinition.js"

export const adminSignOutRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.admin}/sign-out`,
    schemas: {
        body: v.object({}),
        return: v.object({}),
    },
})
