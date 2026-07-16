import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { organizationUserSchema, organizationUserSchemaReturn } from "../../../../../../../schemas/organizationUser.js"
import { userSchema } from "../../../../../../../schemas/user.js"
import { stringSchema } from "../../../../../../../components/schemas/stringSchema.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const createOneOrganizationUserRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/users`,
    schemas: {
        body: v.object({
            isAdmin: organizationUserSchema.entries.isAdmin,
            user: v.object({
                email: userSchema.entries.email,
            }),
        }),
        return: v.merge([
            organizationUserSchemaReturn,
            v.object({
                temporaryPassword: v.nullable(v.nonNullable(stringSchema, "")),
            }),
        ]),
    },
})
