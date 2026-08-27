import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { entrySchemaReturn } from "../../../../../../../../schemas/entry.js"
import { entryLineSchemaReturn } from "../../../../../../../../schemas/entryLine.js"
import { journalSchema } from "../../../../../../../../schemas/journal.js"
import { yearSchema } from "../../../../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const executeScenarioRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/scenarios/:scenario`,
    name: "execute-scenario",
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
            idJournal: journalSchema.entries.id,
            date: v.optional(yearSchema.entries.startingAt),
            params: v.optional(v.record(v.string(), v.unknown(), "Les paramètres doivent être un objet")),
        }),
        return: v.object({
            entries: v.array(
                v.object({
                    entry: entrySchemaReturn,
                    lines: v.array(entryLineSchemaReturn),
                }),
            ),
        }),
    },
})
