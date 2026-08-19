import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { computationSchema } from "../../../../../../../../../../schemas/computation.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const deleteOneComputationRouteDefinition = routeDefinition({
    protocol: "http",
    method: "DELETE",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/computations/:idComputation`,
    name: "delete-one-computation",
    schemas: {
        body: v.object({
            idComputation: computationSchema.entries.id,
            idYear: computationSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
