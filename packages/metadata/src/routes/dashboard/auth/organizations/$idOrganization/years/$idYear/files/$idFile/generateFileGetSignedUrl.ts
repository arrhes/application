import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { fileSchema } from "../../../../../../../../../schemas/file.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const generateFileGetSignedUrlRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/files/:idFile/download-url`,
    schemas: {
        body: v.object({
            idFile: fileSchema.entries.id,
        }),
        return: v.object({
            url: v.string(),
        }),
    },
})
