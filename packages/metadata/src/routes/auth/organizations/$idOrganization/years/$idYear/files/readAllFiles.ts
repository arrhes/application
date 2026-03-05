import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { fileSchema, fileSchemaReturn } from "../../../../../../../schemas/file.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const readAllFilesRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-files`,
    schemas: {
        body: v.object({
            idYear: fileSchema.entries.idYear,
        }),
        return: v.array(fileSchemaReturn),
    },
})
