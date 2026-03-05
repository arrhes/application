import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { recordRowSchema } from "../../../../../../../../../../schemas/recordRow.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const deleteOneRecordRowRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-record-row`,
    schemas: {
        body: v.object({
            idRecordRow: recordRowSchema.entries.id,
            idYear: recordRowSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
