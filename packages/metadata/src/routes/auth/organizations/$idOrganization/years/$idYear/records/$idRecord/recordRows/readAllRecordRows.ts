import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { recordRowSchema, recordRowSchemaReturn } from "../../../../../../../../../schemas/recordRow.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const readAllRecordRowsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-record-rows`,
    schemas: {
        body: v.object({
            idYear: recordRowSchema.entries.idYear,
            idRecord: v.optional(recordRowSchema.entries.idRecord),
        }),
        return: v.array(recordRowSchemaReturn),
    },
})
