import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { recordRowSchema, recordRowSchemaReturn } from "../../../../../../../../../../schemas/recordRow.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const readOneRecordRowRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-record-row`,
    schemas: {
        body: v.object({
            idRecordRow: recordRowSchema.entries.id,
            idYear: recordRowSchema.entries.idYear,
        }),
        return: recordRowSchemaReturn,
    },
})
