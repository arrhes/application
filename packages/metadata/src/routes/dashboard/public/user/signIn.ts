import * as v from "valibot"
import { routePath, stringSchema } from "../../../../components/index.js"
import { dashboardUserSchema } from "../../../../schemas/dashboardUser.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const signInRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.public}/sign-in`,
    schemas: {
        body: v.object({
            email: dashboardUserSchema.entries.email,
            password: v.nonNullable(stringSchema, "Ce champ est requis"),
        }),
        return: v.object({}),
    },
})
