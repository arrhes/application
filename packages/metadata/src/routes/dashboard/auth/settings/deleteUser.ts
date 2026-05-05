import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { stringSchema } from "../../../../components/schemas/stringSchema.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const deleteUserRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-user`,
    schemas: {
        body: v.object({
            currentPassword: v.nonNullable(stringSchema, "Le mot de passe doit être renseigné"),
        }),
        return: v.object({}),
    },
})
