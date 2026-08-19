import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { folderSchema, folderSchemaReturn } from "../../../../../../../../schemas/folder.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const createOneFolderRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/folders`,
    name: "create-one-folder",
    schemas: {
        body: v.object({
            idFolderParent: v.optional(folderSchema.entries.idFolderParent),
            name: folderSchema.entries.name,
        }),
        return: folderSchemaReturn,
    },
})
