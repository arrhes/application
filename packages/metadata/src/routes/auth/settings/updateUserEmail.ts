import * as v from "valibot"
import { routePath } from "../../../components/index.js"
import { stringSchema } from "../../../components/schemas/stringSchema.js"
import { userSchema, userSchemaReturn } from "../../../schemas/user.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"

export const updateUserEmailRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-user-email`,
    schemas: {
        body: v.object({
            currentPassword: v.nonNullable(stringSchema, "Le mot de passe doit être renseigné"),
            emailToValidate: v.nonNullable(userSchema.entries.emailToValidate, "L'email doit être renseigné"),
        }),
        return: userSchemaReturn,
    },
})
