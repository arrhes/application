import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { organizationUserSchemaReturn } from "../../../../../../../schemas/organizationUser.js"
import { dashboardUserSchemaReturn } from "../../../../../../../schemas/dashboardUser.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const readAllOrganizationUsersRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-organization-users`,
    schemas: {
        body: v.object({}),
        return: v.array(
            v.object({
                ...organizationUserSchemaReturn.entries,
                user: v.object({
                    id: dashboardUserSchemaReturn.entries.id,
                    email: dashboardUserSchemaReturn.entries.email,
                    alias: dashboardUserSchemaReturn.entries.alias,
                }),
            }),
        ),
    },
})
