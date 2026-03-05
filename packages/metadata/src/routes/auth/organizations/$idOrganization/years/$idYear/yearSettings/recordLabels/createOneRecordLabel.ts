import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { recordLabelSchema, recordLabelSchemaReturn } from "../../../../../../../../schemas/recordLabel.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const createOneRecordLabelRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-record-label`,
    schemas: {
        body: v.object({
            idYear: recordLabelSchema.entries.idYear,

            label: recordLabelSchema.entries.label,
        }),
        return: recordLabelSchemaReturn,
    },
})
