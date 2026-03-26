import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { tagSchema, tagSchemaReturn } from "../../../../../../../../../schemas/tag.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const readAllTagsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-tags`,
    schemas: {
        body: v.object({
            idYear: tagSchema.entries.idYear,
        }),
        return: v.array(tagSchemaReturn),
    },
})
