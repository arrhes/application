import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { recordSchema, recordSchemaReturn } from "../../../../../../../schemas/record.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const readAllRecordsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-records`,
    schemas: {
        body: v.object({
            idYear: recordSchema.entries.idYear,
        }),
        return: v.array(recordSchemaReturn),
    },
})
