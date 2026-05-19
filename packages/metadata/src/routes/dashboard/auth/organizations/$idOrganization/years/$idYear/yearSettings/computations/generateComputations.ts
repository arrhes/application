import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { computationSchema, computationSchemaReturn } from "../../../../../../../../../schemas/computation.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const generateComputationsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/computations/generate`,
    schemas: {
        body: v.object({
            idYear: computationSchema.entries.idYear,
        }),
        return: v.array(computationSchemaReturn),
    },
})
