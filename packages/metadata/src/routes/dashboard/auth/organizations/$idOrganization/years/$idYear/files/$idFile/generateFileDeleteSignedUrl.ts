import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { fileSchema } from "../../../../../../../../../schemas/file.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const generateFileDeleteSignedUrlRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-file-delete-signed-url`,
    schemas: {
        body: v.object({
            idFile: fileSchema.entries.id,
        }),
        return: v.object({
            url: v.string(),
        }),
    },
})