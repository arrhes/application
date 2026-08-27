import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const readAllScenariosRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/scenarios`,
    name: "read-all-scenarios",
    schemas: {
        body: v.object({}),
        return: v.array(
            v.object({
                scenario: v.string(),
                title: v.string(),
                description: v.string(),
            }),
        ),
    },
})
