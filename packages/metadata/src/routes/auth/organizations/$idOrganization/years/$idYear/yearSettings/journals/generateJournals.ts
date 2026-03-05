/*
import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { journalSchema, journalSchemaReturn } from "../../../../../../../../schemas/journal.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const generateJournalsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-journals`,
    schemas: {
        body: v.object({
            idYear: journalSchema.entries.idYear,
        }),
        return: v.array(journalSchemaReturn),
    },
})
*/
