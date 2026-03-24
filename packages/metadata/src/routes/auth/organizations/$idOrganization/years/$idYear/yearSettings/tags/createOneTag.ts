import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { tagSchema, tagSchemaReturn } from "../../../../../../../../schemas/tag.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const createOneTagRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-tag`,
    schemas: {
        body: v.object({
            idYear: tagSchema.entries.idYear,

            label: tagSchema.entries.label,
        }),
        return: tagSchemaReturn,
    },
})
