import * as v from "valibot"
import { routePath } from "../../../components/index.js"
import { userSchema, userSchemaReturn } from "../../../schemas/user.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"

export const updateUserRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-user`,
    schemas: {
        body: v.object({
            alias: v.optional(userSchema.entries.alias),
        }),
        return: userSchemaReturn,
    },
})
