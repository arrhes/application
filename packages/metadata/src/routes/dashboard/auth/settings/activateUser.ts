import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { dashboardUserSchema, dashboardUserSchemaReturn } from "../../../../schemas/dashboardUser.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const activateUserRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/activate-user`,
    schemas: {
        body: v.object({
            emailToken: v.nonNullable(dashboardUserSchema.entries.emailToken),
        }),
        return: dashboardUserSchemaReturn,
    },
})
