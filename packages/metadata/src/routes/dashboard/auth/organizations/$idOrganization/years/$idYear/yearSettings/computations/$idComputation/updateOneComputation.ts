import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { computationSchema, computationSchemaReturn } from "../../../../../../../../../../schemas/computation.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const updateOneComputationRouteDefinition = routeDefinition({
    protocol: "http",
    method: "PATCH",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/computations/:idComputation`,
    name: "update-one-computation",
    schemas: {
        body: v.object({
            idComputation: computationSchema.entries.id,
            idYear: computationSchema.entries.idYear,
            index: v.optional(computationSchema.entries.index),
            number: v.optional(computationSchema.entries.number),
            label: v.optional(computationSchema.entries.label),
        }),
        return: computationSchemaReturn,
    },
})
