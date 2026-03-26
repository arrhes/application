import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { tagSchema } from "../../../../../../../../../../schemas/tag.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const deleteOneTagRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-tag`,
    schemas: {
        body: v.object({
            idTag: tagSchema.entries.id,
            idYear: tagSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
