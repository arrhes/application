import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { folderSchema, folderSchemaReturn } from "../../../../../../../schemas/folder.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const readAllFoldersRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-folders`,
    schemas: {
        body: v.object({
            idYear: folderSchema.entries.idYear,
        }),
        return: v.array(folderSchemaReturn),
    },
})
