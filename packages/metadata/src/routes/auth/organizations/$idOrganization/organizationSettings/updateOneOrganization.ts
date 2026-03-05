import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { organizationSchema, organizationSchemaReturn } from "../../../../../schemas/organization.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const updateOneOrganizationRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-organization`,
    schemas: {
        body: v.object({
            siren: v.optional(organizationSchema.entries.siren),
            name: v.optional(organizationSchema.entries.name),
            email: v.optional(organizationSchema.entries.email),
        }),
        return: organizationSchemaReturn,
    },
})
