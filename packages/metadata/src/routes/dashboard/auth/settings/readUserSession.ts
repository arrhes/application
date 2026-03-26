import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { dashboardUserSchemaReturn } from "../../../../schemas/dashboardUser.js"
import { dashboardUserSessionSchemaReturn } from "../../../../schemas/dashboardUserSession.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const readUserSessionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-user-session`,
    schemas: {
        body: v.object({}),
        return: v.object({
            ...dashboardUserSessionSchemaReturn.entries,
            user: dashboardUserSchemaReturn,
        }),
    },
})
