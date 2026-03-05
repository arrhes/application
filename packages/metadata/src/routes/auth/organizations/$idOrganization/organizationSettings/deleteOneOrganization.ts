import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const deleteOneOrganizationRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-organization`,
    schemas: {
        body: v.object({}),
        return: v.object({}),
    },
})
