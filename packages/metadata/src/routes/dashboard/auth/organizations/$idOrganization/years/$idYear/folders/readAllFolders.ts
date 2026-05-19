import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { folderSchemaReturn } from "../../../../../../../../schemas/folder.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const readAllFoldersRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/folders`,
    schemas: {
        body: v.object({}),
        return: v.array(folderSchemaReturn),
    },
})
