import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { yearSchema, yearSchemaReturn } from "../../../../../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const closeYearRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/close`,
    name: "close-year",
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
        }),
        return: yearSchemaReturn,
    },
})
