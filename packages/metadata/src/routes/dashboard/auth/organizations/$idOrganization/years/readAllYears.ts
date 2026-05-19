import * as v from "valibot"
import { routePath } from "../../../../../../components/index.js"
import { yearSchemaReturn } from "../../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"

export const readAllYearsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years`,
    schemas: {
        body: v.object({
            idOrganization: v.optional(v.string()),
        }),
        return: v.array(yearSchemaReturn),
    },
})
