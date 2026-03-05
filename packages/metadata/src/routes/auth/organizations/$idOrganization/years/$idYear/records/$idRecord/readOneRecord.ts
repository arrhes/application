import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { recordSchema, recordSchemaReturn } from "../../../../../../../../schemas/record.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const readOneRecordRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-record`,
    schemas: {
        body: v.object({
            idRecord: recordSchema.entries.id,
            idYear: recordSchema.entries.idYear,
        }),
        return: recordSchemaReturn,
    },
})
