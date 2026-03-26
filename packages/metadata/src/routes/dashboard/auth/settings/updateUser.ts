import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { dashboardUserSchema, dashboardUserSchemaReturn } from "../../../../schemas/dashboardUser.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const updateUserRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-user`,
    schemas: {
        body: v.object({
            alias: v.optional(dashboardUserSchema.entries.alias),
        }),
        return: dashboardUserSchemaReturn,
    },
})
