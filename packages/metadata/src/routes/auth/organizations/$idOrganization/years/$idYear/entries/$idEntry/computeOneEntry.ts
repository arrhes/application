import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { entrySchema, entrySchemaReturn } from "../../../../../../../../schemas/entry.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const computeOneEntryRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/compute-one-entry`,
    schemas: {
        body: v.object({
            idEntry: entrySchema.entries.id,
            idYear: entrySchema.entries.idYear,
        }),
        return: entrySchemaReturn,
    },
})
