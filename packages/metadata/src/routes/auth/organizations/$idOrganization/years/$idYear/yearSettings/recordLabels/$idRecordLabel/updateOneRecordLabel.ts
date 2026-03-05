import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { recordLabelSchema, recordLabelSchemaReturn } from "../../../../../../../../../schemas/recordLabel.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const updateOneRecordLabelRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-record-label`,
    schemas: {
        body: v.object({
            idRecordLabel: recordLabelSchema.entries.id,
            idYear: recordLabelSchema.entries.idYear,

            label: v.optional(recordLabelSchema.entries.label),
        }),
        return: recordLabelSchemaReturn,
    },
})
