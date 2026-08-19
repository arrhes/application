import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { organizationSchema, organizationSchemaReturn } from "../../../../schemas/organization.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const addNewOrganizationRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations`,
    schemas: {
        body: v.object({
            scope: organizationSchema.entries.scope,
            name: organizationSchema.entries.name,
        }),
        return: organizationSchemaReturn,
    },
})
