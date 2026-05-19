import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { organizationUserSchema, organizationUserSchemaReturn } from "../../../../../../../schemas/organizationUser.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const updateOneOrganizationUserRouteDefinition = routeDefinition({
    protocol: "http",
    method: "PATCH",
    path: `${routePath.v1}/organizations/:idOrganization/users/:idOrganizationUser`,
    schemas: {
        body: v.object({
            idOrganizationUser: organizationUserSchema.entries.id,
            isAdmin: v.optional(organizationUserSchema.entries.isAdmin),
        }),
        return: organizationUserSchemaReturn,
    },
})
