import * as v from "valibot"
import { routePath } from "../../../components/index.js"
import { organizationUserSchema } from "../../../schemas/organizationUser.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"

export const activateOrganizationMembershipRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/activate-organization-membership`,
    schemas: {
        body: v.object({
            idOrganizationUser: organizationUserSchema.entries.id,
        }),
        return: v.object({}),
    },
})
