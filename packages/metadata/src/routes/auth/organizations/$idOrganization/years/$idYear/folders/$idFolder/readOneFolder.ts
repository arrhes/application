import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { folderSchema, folderSchemaReturn } from "../../../../../../../../schemas/folder.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const readOneFolderRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-folder`,
    schemas: {
        body: v.object({
            idFolder: folderSchema.entries.id,
            idYear: folderSchema.entries.idYear,
        }),
        return: folderSchemaReturn,
    },
})
