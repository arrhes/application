import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { computationSchema, computationSchemaReturn } from "../../../../../../../../../../schemas/computation.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const readOneComputationRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/computations/:idComputation`,
    schemas: {
        body: v.object({
            idComputation: computationSchema.entries.id,
            idYear: computationSchema.entries.idYear,
        }),
        return: computationSchemaReturn,
    },
})
