import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { fileSchema, fileSchemaReturn } from "../../../../../../../../schemas/file.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const generateFilePutSignedUrlRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-file-put-signed-url`,
    schemas: {
        body: v.object({
            idFile: fileSchema.entries.id,
            idYear: fileSchema.entries.idYear,
            type: v.nonNullable(fileSchema.entries.type.wrapped, "Ce champ est requis"),
            size: v.nonNullable(fileSchema.entries.size.wrapped, "Ce champ est requis"),
        }),
        return: v.object({
            file: fileSchemaReturn,
            url: v.string(),
        }),
    },
})
