import * as v from "valibot"
import { routePath, stringSchema } from "../../../components/index.js"
import { userSchema } from "../../../schemas/user.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"

export const signInRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.public}/sign-in`,
    schemas: {
        body: v.object({
            email: userSchema.entries.email,
            password: v.nonNullable(stringSchema, "Ce champ est requis"),
        }),
        return: v.object({}),
    },
})
