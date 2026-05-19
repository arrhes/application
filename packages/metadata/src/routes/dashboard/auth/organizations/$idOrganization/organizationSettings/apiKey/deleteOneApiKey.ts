import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { apiKeySchema } from "../../../../../../../schemas/apiKey.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const deleteOneApiKeyRouteDefinition = routeDefinition({
    protocol: "http",
    method: "DELETE",
    path: `${routePath.v1}/organizations/:idOrganization/api-keys/:idApiKey`,
    schemas: {
        body: v.object({
            idApiKey: apiKeySchema.entries.id,
        }),
        return: v.object({}),
    },
})
