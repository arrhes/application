import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { entrySchema, entrySchemaReturn } from "../../../../../../../schemas/entry.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const createOneEntryRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-entry`,
    schemas: {
        body: v.object({
            idYear: entrySchema.entries.idYear,
            idJournal: v.optional(entrySchema.entries.idJournal),
            idFile: v.optional(entrySchema.entries.idFile),
            label: entrySchema.entries.label,
            date: entrySchema.entries.date,
        }),
        return: entrySchemaReturn,
    },
})
