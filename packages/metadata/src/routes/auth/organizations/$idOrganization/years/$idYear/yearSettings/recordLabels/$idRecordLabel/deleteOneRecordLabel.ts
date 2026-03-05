import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { recordLabelSchema } from "../../../../../../../../../schemas/recordLabel.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const deleteOneRecordLabelRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-record-label`,
    schemas: {
        body: v.object({
            idRecordLabel: recordLabelSchema.entries.id,
            idYear: recordLabelSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
