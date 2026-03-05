import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { recordSchema } from "../../../../../../../../schemas/record.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const deleteOneRecordRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-record`,
    schemas: {
        body: v.object({
            idRecord: recordSchema.entries.id,
            idYear: recordSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
