import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { journalSchema, journalSchemaReturn } from "../../../../../../../../schemas/journal.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const createOneJournalRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-journal`,
    schemas: {
        body: v.object({
            idYear: journalSchema.entries.idYear,
            code: journalSchema.entries.code,
            label: journalSchema.entries.label,
        }),
        return: journalSchemaReturn,
    },
})
