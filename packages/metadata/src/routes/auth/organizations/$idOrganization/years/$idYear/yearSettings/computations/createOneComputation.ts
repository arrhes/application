import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { computationSchema, computationSchemaReturn } from "../../../../../../../../schemas/computation.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const createOneComputationRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-computation`,
    schemas: {
        body: v.object({
            idYear: computationSchema.entries.idYear,
            index: computationSchema.entries.index,
            number: computationSchema.entries.number,
            label: computationSchema.entries.label,
        }),
        return: computationSchemaReturn,
    },
})
