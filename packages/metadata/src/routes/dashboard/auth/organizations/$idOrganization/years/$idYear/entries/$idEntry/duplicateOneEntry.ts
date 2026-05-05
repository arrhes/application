import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { entrySchema, entrySchemaReturn } from "../../../../../../../../../schemas/entry.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const duplicateOneEntryRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/duplicate-one-entry`,
    schemas: {
        body: v.object({
            idEntry: entrySchema.entries.id,
            idYear: entrySchema.entries.idYear,
        }),
        return: entrySchemaReturn,
    },
})
