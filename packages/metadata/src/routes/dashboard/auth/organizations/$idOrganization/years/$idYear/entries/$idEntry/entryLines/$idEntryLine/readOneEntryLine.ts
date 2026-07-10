import * as v from "valibot"
import { routePath } from "../../../../../../../../../../../components/index.js"
import { entryLineSchema, entryLineSchemaReturn } from "../../../../../../../../../../../schemas/entryLine.js"
import { routeDefinition } from "../../../../../../../../../../../utilities/routeDefinition.js"

export const readOneEntryLineRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/entries/:idEntry/lines/:idEntryLine`,
    name: "read-one-entry-line",
    schemas: {
        body: v.object({
            idEntryLine: entryLineSchema.entries.id,
            idYear: entryLineSchema.entries.idYear,
        }),
        return: entryLineSchemaReturn,
    },
})
