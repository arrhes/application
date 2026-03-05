import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { recordLabelSchema, recordLabelSchemaReturn } from "../../../../../../../../schemas/recordLabel.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const readAllRecordLabelsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-record-labels`,
    schemas: {
        body: v.object({
            idYear: recordLabelSchema.entries.idYear,
        }),
        return: v.array(recordLabelSchemaReturn),
    },
})
