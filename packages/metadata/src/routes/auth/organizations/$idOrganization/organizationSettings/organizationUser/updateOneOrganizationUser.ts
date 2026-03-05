import * as v from "valibot"
import { routePath } from "../../../../../../components/index.js"
import { organizationUserSchema, organizationUserSchemaReturn } from "../../../../../../schemas/organizationUser.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"

export const updateOneOrganizationUserRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-organization-user`,
    schemas: {
        body: v.object({
            idOrganizationUser: organizationUserSchema.entries.id,
            isAdmin: v.optional(organizationUserSchema.entries.isAdmin),
        }),
        return: organizationUserSchemaReturn,
    },
})
