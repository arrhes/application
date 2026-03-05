import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { fileSchema } from "../../../../../../../../schemas/file.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const generateFileGetSignedUrlRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-file-get-signed-url`,
    schemas: {
        body: v.object({
            idFile: fileSchema.entries.id,
            idYear: fileSchema.entries.idYear,
        }),
        return: v.object({
            url: v.string(),
        }),
    },
})
