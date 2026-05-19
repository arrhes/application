import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { tagSchema, tagSchemaReturn } from "../../../../../../../../../schemas/tag.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const createOneTagRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/tags`,
    schemas: {
        body: v.object({
            idYear: tagSchema.entries.idYear,

            label: tagSchema.entries.label,
        }),
        return: tagSchemaReturn,
    },
})
