import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { entryLineSchema, entryLineSchemaReturn } from "../../../../../../../../../../schemas/entryLine.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const readOneEntryLineRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-entry-line`,
    schemas: {
        body: v.object({
            idEntryLine: entryLineSchema.entries.id,
            idYear: entryLineSchema.entries.idYear,
        }),
        return: entryLineSchemaReturn,
    },
})
