import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { yearSchema, yearSchemaReturn } from "../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const createOneYearRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-year`,
    schemas: {
        body: v.object({
            idYearPrevious: v.optional(yearSchema.entries.idYearPrevious),
            label: v.optional(yearSchema.entries.label),
            startingAt: yearSchema.entries.startingAt,
            endingAt: yearSchema.entries.endingAt,
        }),
        return: yearSchemaReturn,
    },
})
