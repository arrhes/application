import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { organizationUserSchema } from "../../../../../../../schemas/organizationUser.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const deleteOneOrganizationUserRouteDefinition = routeDefinition({
    protocol: "http",
    method: "DELETE",
    path: `${routePath.v1}/organizations/:idOrganization/users/:idOrganizationUser`,
    schemas: {
        body: v.object({
            idOrganizationUser: organizationUserSchema.entries.id,
        }),
        return: v.object({}),
    },
})
