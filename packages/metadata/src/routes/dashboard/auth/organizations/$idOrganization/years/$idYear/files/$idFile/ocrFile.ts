import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { fileSchema, fileSchemaReturn } from "../../../../../../../../../schemas/file.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const ocrFileRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/ocr-file`,
    schemas: {
        body: v.object({
            idFile: fileSchema.entries.id,
            idYear: fileSchema.entries.idYear,
        }),
        return: v.object({
            file: fileSchemaReturn,
        }),
    },
})
