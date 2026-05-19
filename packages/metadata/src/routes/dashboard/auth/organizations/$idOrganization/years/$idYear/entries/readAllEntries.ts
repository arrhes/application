import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { entrySchema, entrySchemaReturn } from "../../../../../../../../schemas/entry.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const readAllEntriesRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/entries`,
    schemas: {
        body: v.object({
            idYear: entrySchema.entries.idYear,
        }),
        return: v.array(entrySchemaReturn),
    },
})
