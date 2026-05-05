import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { entrySchema, entrySchemaReturn } from "../../../../../../../../../schemas/entry.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const updateOneEntryRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-entry`,
    schemas: {
        body: v.object({
            idEntry: entrySchema.entries.id,
            idYear: entrySchema.entries.idYear,
            idJournal: v.optional(entrySchema.entries.idJournal),
            idFile: v.optional(entrySchema.entries.idFile),
            label: v.optional(entrySchema.entries.label),
            date: v.optional(entrySchema.entries.date),
        }),
        return: entrySchemaReturn,
    },
})
