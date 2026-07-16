import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { userSchema } from "../../../../schemas/user.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const resetPasswordRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/auth/reset-password`,
    schemas: {
        body: v.object({
            email: v.nonNullable(userSchema.entries.email),
        }),
        return: v.object({
            password: v.string(),
        }),
    },
})
