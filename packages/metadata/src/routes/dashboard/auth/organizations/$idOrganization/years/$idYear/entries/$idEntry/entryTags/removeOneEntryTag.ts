import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { entryTagSchema } from "../../../../../../../../../../schemas/entryTag.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const removeOneEntryTagRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/remove-one-entry-tag`,
    schemas: {
        body: v.object({
            idYear: entryTagSchema.entries.idYear,
            idEntryTag: entryTagSchema.entries.id,
        }),
        return: v.object({}),
    },
})
