import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { recordSchema, recordSchemaReturn } from "../../../../../../../../schemas/record.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const computeOneRecordRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/compute-one-record`,
    schemas: {
        body: v.object({
            idRecord: recordSchema.entries.id,
            idYear: recordSchema.entries.idYear,
        }),
        return: recordSchemaReturn,
    },
})
