import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { recordSchema, recordSchemaReturn } from "../../../../../../../../schemas/record.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const duplicateOneRecordRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/duplicate-one-record`,
    schemas: {
        body: v.object({
            idRecord: recordSchema.entries.id,
            idYear: recordSchema.entries.idYear,
        }),
        return: recordSchemaReturn,
    },
})
