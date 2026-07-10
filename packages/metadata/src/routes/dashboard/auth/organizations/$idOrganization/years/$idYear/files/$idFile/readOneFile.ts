import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { fileSchema, fileSchemaReturn } from "../../../../../../../../../schemas/file.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const readOneFileRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/files/:idFile`,
    name: "read-one-file",
    schemas: {
        body: v.object({
            idFile: fileSchema.entries.id,
        }),
        return: fileSchemaReturn,
    },
})
