import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { fileSchema, fileSchemaReturn } from "../../../../../../../../schemas/file.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const updateOneFileRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-file`,
    schemas: {
        body: v.object({
            idFile: fileSchema.entries.id,
            idYear: fileSchema.entries.idYear,
            reference: v.optional(fileSchema.entries.reference),
            name: v.optional(fileSchema.entries.name),
            idFolder: v.optional(fileSchema.entries.idFolder),
        }),
        return: fileSchemaReturn,
    },
})
