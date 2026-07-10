import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { computationSchema, computationSchemaReturn } from "../../../../../../../../../schemas/computation.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const readAllComputationsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/computations`,
    name: "read-all-computations",
    schemas: {
        body: v.object({
            idYear: computationSchema.entries.idYear,
        }),
        return: v.array(computationSchemaReturn),
    },
})
