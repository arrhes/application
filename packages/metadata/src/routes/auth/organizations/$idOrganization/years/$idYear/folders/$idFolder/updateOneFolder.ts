import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { folderSchema, folderSchemaReturn } from "../../../../../../../../schemas/folder.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const updateOneFolderRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-folder`,
    schemas: {
        body: v.object({
            idFolder: folderSchema.entries.id,
            idYear: folderSchema.entries.idYear,
            name: v.optional(folderSchema.entries.name),
            idFolderParent: v.optional(folderSchema.entries.idFolderParent),
        }),
        return: folderSchemaReturn,
    },
})
