import * as v from "valibot"
import { routePath } from "../../../components/index.js"
import { passwordSchema } from "../../../components/schemas/passwordSchema.js"
import { stringSchema } from "../../../components/schemas/stringSchema.js"
import { userSchemaReturn } from "../../../schemas/user.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"

export const updateUserPasswordRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-user-password`,
    schemas: {
        body: v.object({
            currentPassword: v.nonNullable(stringSchema, "Le mot de passe actuel doit être renseigné"),
            newPassword: v.nonNullable(passwordSchema, "Le nouveau mot de passe doit être renseigné"),
            newPasswordCheck: v.nonNullable(passwordSchema, "Le nouveau mot de passe doit être renseigné"),
        }),
        return: userSchemaReturn,
    },
})
