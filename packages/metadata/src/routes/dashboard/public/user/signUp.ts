import * as v from "valibot"
import { passwordSchema, routePath } from "../../../../components/index.js"
import { dashboardUserSchema } from "../../../../schemas/dashboardUser.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const signUpRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.public}/sign-up`,
    schemas: {
        body: v.object({
            email: dashboardUserSchema.entries.email,
            password: passwordSchema,
            passwordCheck: passwordSchema,
        }),
        return: v.object({}),
    },
})
