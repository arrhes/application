import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { folderSchema, folderSchemaReturn } from "../../../../../../../schemas/folder.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const createOneFolderRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-folder`,
    schemas: {
        body: v.object({
            idYear: folderSchema.entries.idYear,
            idFolderParent: v.optional(folderSchema.entries.idFolderParent),
            name: folderSchema.entries.name,
        }),
        return: folderSchemaReturn,
    },
})
