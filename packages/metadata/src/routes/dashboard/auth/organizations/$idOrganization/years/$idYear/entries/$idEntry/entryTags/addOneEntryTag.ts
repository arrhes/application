import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { entryTagSchema, entryTagSchemaReturn } from "../../../../../../../../../../schemas/entryTag.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const addOneEntryTagRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/entries/:idEntry/tags`,
    schemas: {
        body: v.object({
            idYear: entryTagSchema.entries.idYear,
            idEntry: entryTagSchema.entries.idEntry,
            idTag: entryTagSchema.entries.idTag,
        }),
        return: entryTagSchemaReturn,
    },
})
