import * as v from "valibot"
import { routePath } from "../../../../../../components/index.js"
import { organizationUserSchema, organizationUserSchemaReturn } from "../../../../../../schemas/organizationUser.js"
import { userSchema } from "../../../../../../schemas/user.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"

export const createOneOrganizationUserRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-organization-user`,
    schemas: {
        body: v.object({
            isAdmin: organizationUserSchema.entries.isAdmin,
            user: v.object({
                email: userSchema.entries.email,
            }),
        }),
        return: organizationUserSchemaReturn,
    },
})
