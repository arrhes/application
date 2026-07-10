import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { tagSchema, tagSchemaReturn } from "../../../../../../../../../../schemas/tag.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const readOneTagRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/tags/:idTag`,
    name: "read-one-tag",
    schemas: {
        body: v.object({
            idTag: tagSchema.entries.id,
            idYear: tagSchema.entries.idYear,
        }),
        return: tagSchemaReturn,
    },
})
