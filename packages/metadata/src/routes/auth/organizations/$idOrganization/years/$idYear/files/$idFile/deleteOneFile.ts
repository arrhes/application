import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { fileSchema } from "../../../../../../../../schemas/file.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const deleteOneFileRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-file`,
    schemas: {
        body: v.object({
            idFile: fileSchema.entries.id,
            idYear: fileSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
