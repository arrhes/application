import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { userSchema, userSchemaReturn } from "../../../../schemas/user.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const activateUserRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/users/me/activate`,
    schemas: {
        body: v.object({
            emailToken: v.nonNullable(userSchema.entries.emailToken),
        }),
        return: userSchemaReturn,
    },
})
