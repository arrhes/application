import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { entrySchema } from "../../../../../../../../../schemas/entry.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const deleteOneEntryRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-entry`,
    schemas: {
        body: v.object({
            idEntry: entrySchema.entries.id,
            idYear: entrySchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
