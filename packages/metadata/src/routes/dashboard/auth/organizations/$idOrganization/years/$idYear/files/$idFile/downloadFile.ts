import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { fileSchema } from "../../../../../../../../../schemas/file.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const downloadFileRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/files/:idFile/content`,
    name: "download-file",
    schemas: {
        body: v.object({
            idFile: fileSchema.entries.id,
        }),
        return: v.object({}),
    },
})
