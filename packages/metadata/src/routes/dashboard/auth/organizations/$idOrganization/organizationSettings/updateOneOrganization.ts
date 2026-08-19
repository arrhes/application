import * as v from "valibot"
import { routePath } from "../../../../../../components/index.js"
import { organizationSchema, organizationSchemaReturn } from "../../../../../../schemas/organization.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"

export const updateOneOrganizationRouteDefinition = routeDefinition({
    protocol: "http",
    method: "PATCH",
    path: `${routePath.v1}/organizations/:idOrganization`,
    schemas: {
        body: v.object({
            name: v.optional(organizationSchema.entries.name),
        }),
        return: organizationSchemaReturn,
    },
})
