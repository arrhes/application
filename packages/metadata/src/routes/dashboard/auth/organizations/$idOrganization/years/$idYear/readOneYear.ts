import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { yearSchema, yearSchemaReturn } from "../../../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const readOneYearRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear`,
    name: "read-one-year",
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
        }),
        return: yearSchemaReturn,
    },
})
