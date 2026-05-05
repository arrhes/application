import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { entrySchema, entrySchemaReturn } from "../../../../../../../../schemas/entry.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const readAllEntriesRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-entries`,
    schemas: {
        body: v.object({
            idYear: entrySchema.entries.idYear,
        }),
        return: v.array(entrySchemaReturn),
    },
})
