import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { organizationSchemaReturn } from "../../../../schemas/organization.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const readOneOrganizationRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-organization`,
    schemas: {
        body: v.object({}),
        return: organizationSchemaReturn,
    },
})
