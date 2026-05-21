import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { userSchema, userSchemaReturn } from "../../../../schemas/user.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const updateUserRouteDefinition = routeDefinition({
    protocol: "http",
    method: "PATCH",
    path: `${routePath.v1}/users/me`,
    schemas: {
        body: v.object({
            alias: v.optional(userSchema.entries.alias),
        }),
        return: userSchemaReturn,
    },
})
