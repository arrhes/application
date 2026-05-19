import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { tagSchema, tagSchemaReturn } from "../../../../../../../../../../schemas/tag.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const updateOneTagRouteDefinition = routeDefinition({
    protocol: "http",
    method: "PATCH",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/tags/:idTag`,
    schemas: {
        body: v.object({
            idTag: tagSchema.entries.id,
            idYear: tagSchema.entries.idYear,

            label: v.optional(tagSchema.entries.label),
        }),
        return: tagSchemaReturn,
    },
})
