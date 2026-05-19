import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { entrySchema, entrySchemaReturn } from "../../../../../../../../../schemas/entry.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const reverseOneEntryRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/entries/:idEntry/reverse`,
    schemas: {
        body: v.object({
            idEntry: entrySchema.entries.id,
            idYear: entrySchema.entries.idYear,
        }),
        return: entrySchemaReturn,
    },
})
