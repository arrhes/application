import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { recordLabelSchema, recordLabelSchemaReturn } from "../../../../../../../../../schemas/recordLabel.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const readOneRecordLabelRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-record-label`,
    schemas: {
        body: v.object({
            idRecordLabel: recordLabelSchema.entries.id,
            idYear: recordLabelSchema.entries.idYear,
        }),
        return: recordLabelSchemaReturn,
    },
})
