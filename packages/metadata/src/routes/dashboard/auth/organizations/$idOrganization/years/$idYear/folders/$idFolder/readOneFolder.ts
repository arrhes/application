import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { folderSchema, folderSchemaReturn } from "../../../../../../../../../schemas/folder.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const readOneFolderRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/folders/:idFolder`,
    schemas: {
        body: v.object({
            idFolder: folderSchema.entries.id,
        }),
        return: folderSchemaReturn,
    },
})
