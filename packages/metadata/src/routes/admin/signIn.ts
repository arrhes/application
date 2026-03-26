import * as v from "valibot"
import { routePath, stringSchema } from "../../components/index.js"
import { adminUserSchema } from "../../schemas/adminUser.js"
import { routeDefinition } from "../../utilities/routeDefinition.js"

export const adminSignInRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.admin}/sign-in`,
    schemas: {
        body: v.object({
            email: adminUserSchema.entries.email,
            password: v.nonNullable(stringSchema, "Ce champ est requis"),
        }),
        return: v.object({}),
    },
})
