import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { organizationUserSchema, organizationUserSchemaReturn } from "../../../../../../../schemas/organizationUser.js"
import { dashboardUserSchemaReturn } from "../../../../../../../schemas/dashboardUser.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const readOneOrganizationUserRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-organization-user`,
    schemas: {
        body: v.object({
            idOrganizationUser: organizationUserSchema.entries.id,
        }),
        return: v.object({
            ...organizationUserSchemaReturn.entries,
            user: v.object({
                id: dashboardUserSchemaReturn.entries.id,
                email: dashboardUserSchemaReturn.entries.email,
                alias: dashboardUserSchemaReturn.entries.alias,
            }),
        }),
    },
})
