import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { entryTagSchema, entryTagSchemaReturn } from "../../../../../../../../schemas/entryTag.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const readAllEntryTagsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/entry-tags`,
    name: "read-all-entry-tags",
    schemas: {
        body: v.object({
            idYear: entryTagSchema.entries.idYear,
        }),
        return: v.array(entryTagSchemaReturn),
    },
})
