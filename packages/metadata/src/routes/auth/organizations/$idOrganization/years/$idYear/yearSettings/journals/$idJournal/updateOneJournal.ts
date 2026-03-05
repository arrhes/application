import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { journalSchema, journalSchemaReturn } from "../../../../../../../../../schemas/journal.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const updateOneJournalRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-journal`,
    schemas: {
        body: v.object({
            idJournal: journalSchema.entries.id,
            idYear: journalSchema.entries.idYear,
            code: v.optional(journalSchema.entries.code),
            label: v.optional(journalSchema.entries.label),
        }),
        return: journalSchemaReturn,
    },
})
