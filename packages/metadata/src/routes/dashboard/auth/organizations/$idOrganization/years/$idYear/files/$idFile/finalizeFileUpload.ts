import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { fileSchema, fileSchemaReturn } from "../../../../../../../../../schemas/file.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const finalizeFileUploadRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/files/:idFile/finalize`,
    schemas: {
        body: v.object({
            idFile: fileSchema.entries.id,
            ocr: v.optional(v.boolean()),
        }),
        return: v.object({
            file: fileSchemaReturn,
            ocrFile: v.optional(fileSchemaReturn),
        }),
    },
})
