import * as v from "valibot"
import { routePath } from "../../../../../../../../../../../components/index.js"
import { entryLineSchema } from "../../../../../../../../../../../schemas/entryLine.js"
import { routeDefinition } from "../../../../../../../../../../../utilities/routeDefinition.js"

export const deleteOneEntryLineRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-entry-line`,
    schemas: {
        body: v.object({
            idEntryLine: entryLineSchema.entries.id,
            idYear: entryLineSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
