import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { fileSchema, fileSchemaReturn } from "../../../../../../../../../schemas/file.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const finalizeFileUploadRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/finalize-file-upload`,
    schemas: {
        body: v.object({
            idFile: fileSchema.entries.id,
        }),
        return: fileSchemaReturn,
    },
})
