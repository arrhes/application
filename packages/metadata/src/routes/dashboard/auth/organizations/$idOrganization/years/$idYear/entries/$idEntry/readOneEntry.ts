import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { entrySchema, entrySchemaReturn } from "../../../../../../../../../schemas/entry.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const readOneEntryRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/entries/:idEntry`,
    name: "read-one-entry",
    schemas: {
        body: v.object({
            idEntry: entrySchema.entries.id,
            idYear: entrySchema.entries.idYear,
        }),
        return: entrySchemaReturn,
    },
})
