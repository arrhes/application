import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { computationSchema, computationSchemaReturn } from "../../../../../../../../../schemas/computation.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const readOneComputationRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-computation`,
    schemas: {
        body: v.object({
            idComputation: computationSchema.entries.id,
            idYear: computationSchema.entries.idYear,
        }),
        return: computationSchemaReturn,
    },
})
