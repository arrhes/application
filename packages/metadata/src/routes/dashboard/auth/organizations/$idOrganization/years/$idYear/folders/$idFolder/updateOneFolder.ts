import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { folderSchema, folderSchemaReturn } from "../../../../../../../../../schemas/folder.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const updateOneFolderRouteDefinition = routeDefinition({
    protocol: "http",
    method: "PATCH",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/folders/:idFolder`,
    name: "update-one-folder",
    schemas: {
        body: v.object({
            idFolder: folderSchema.entries.id,
            name: v.optional(folderSchema.entries.name),
            idFolderParent: v.optional(folderSchema.entries.idFolderParent),
        }),
        return: folderSchemaReturn,
    },
})
