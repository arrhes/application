import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { journalSchema, journalSchemaReturn } from "../../../../../../../../../schemas/journal.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const readOneJournalRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-journal`,
    schemas: {
        body: v.object({
            idJournal: journalSchema.entries.id,
            idYear: journalSchema.entries.idYear,
        }),
        return: journalSchemaReturn,
    },
})
