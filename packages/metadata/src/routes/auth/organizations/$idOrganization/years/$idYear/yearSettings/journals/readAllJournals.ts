import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { journalSchema, journalSchemaReturn } from "../../../../../../../../schemas/journal.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const readAllJournalsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-journals`,
    schemas: {
        body: v.object({
            idYear: journalSchema.entries.idYear,
        }),
        return: v.array(journalSchemaReturn),
    },
})
