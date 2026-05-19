import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { folderSchema } from "../../../../../../../../../schemas/folder.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const deleteOneFolderRouteDefinition = routeDefinition({
    protocol: "http",
    method: "DELETE",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/folders/:idFolder`,
    schemas: {
        body: v.object({
            idFolder: folderSchema.entries.id,
        }),
        return: v.object({}),
    },
})
