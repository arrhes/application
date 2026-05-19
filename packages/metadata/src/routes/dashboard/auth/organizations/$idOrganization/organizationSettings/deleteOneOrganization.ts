import * as v from "valibot"
import { routePath } from "../../../../../../components/index.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"

export const deleteOneOrganizationRouteDefinition = routeDefinition({
    protocol: "http",
    method: "DELETE",
    path: `${routePath.v1}/organizations/:idOrganization`,
    schemas: {
        body: v.object({}),
        return: v.object({}),
    },
})
