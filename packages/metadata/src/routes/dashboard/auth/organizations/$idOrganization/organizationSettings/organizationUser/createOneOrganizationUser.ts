import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { dashboardUserSchema } from "../../../../../../../schemas/dashboardUser.js"
import { organizationUserSchema, organizationUserSchemaReturn } from "../../../../../../../schemas/organizationUser.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const createOneOrganizationUserRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-organization-user`,
    schemas: {
        body: v.object({
            isAdmin: organizationUserSchema.entries.isAdmin,
            user: v.object({
                email: dashboardUserSchema.entries.email,
            }),
        }),
        return: organizationUserSchemaReturn,
    },
})
