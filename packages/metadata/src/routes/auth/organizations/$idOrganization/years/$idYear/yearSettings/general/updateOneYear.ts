import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { yearSchema, yearSchemaReturn } from "../../../../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const updateOneYearRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-year`,
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
            idYearPrevious: v.optional(yearSchema.entries.idYearPrevious),
            label: v.optional(yearSchema.entries.label),
            startingAt: v.optional(yearSchema.entries.startingAt),
            endingAt: v.optional(yearSchema.entries.endingAt),
        }),
        return: yearSchemaReturn,
    },
})
