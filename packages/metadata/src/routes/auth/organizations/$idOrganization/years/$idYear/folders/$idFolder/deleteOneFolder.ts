import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { folderSchema } from "../../../../../../../../schemas/folder.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const deleteOneFolderRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-folder`,
    schemas: {
        body: v.object({
            idFolder: folderSchema.entries.id,
            idYear: folderSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
