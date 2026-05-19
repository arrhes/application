import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { organizationSchema, organizationSchemaReturn } from "../../../../../schemas/organization.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const readOneOrganizationRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization`,
    schemas: {
        body: v.object({
            idOrganization: organizationSchema.entries.id,
        }),
        return: organizationSchemaReturn,
    },
})
