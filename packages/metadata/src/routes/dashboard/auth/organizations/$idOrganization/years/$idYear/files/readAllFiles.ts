import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { fileSchemaReturn } from "../../../../../../../../schemas/file.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const readAllFilesRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/files`,
    name: "read-all-files",
    schemas: {
        body: v.object({}),
        return: v.array(fileSchemaReturn),
    },
})
