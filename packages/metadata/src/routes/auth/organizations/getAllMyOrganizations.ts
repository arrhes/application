import * as v from "valibot"
import { routePath } from "../../../components/index.js"
import { organizationSchemaReturn } from "../../../schemas/organization.js"
import { organizationUserSchemaReturn } from "../../../schemas/organizationUser.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"

export const getAllMyOrganizationsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/get-all-my-organization`,
    schemas: {
        body: v.object({}),
        return: v.array(
            v.object({
                ...organizationUserSchemaReturn.entries,
                organization: organizationSchemaReturn,
            }),
        ),
    },
})
