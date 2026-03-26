import * as v from "valibot"
import { routePath } from "../../components/index.js"
import { adminUserSchemaReturn } from "../../schemas/adminUser.js"
import { adminUserSessionSchemaReturn } from "../../schemas/adminUserSession.js"
import { routeDefinition } from "../../utilities/routeDefinition.js"

export const readAdminUserSessionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.admin}/read-admin-user-session`,
    schemas: {
        body: v.object({}),
        return: v.object({
            ...adminUserSessionSchemaReturn.entries,
            adminUser: adminUserSchemaReturn,
        }),
    },
})
