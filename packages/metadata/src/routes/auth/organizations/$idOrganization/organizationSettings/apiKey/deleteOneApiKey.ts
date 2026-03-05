import * as v from "valibot"
import { routePath } from "../../../../../../components/index.js"
import { apiKeySchema } from "../../../../../../schemas/apiKey.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"

export const deleteOneApiKeyRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-api-key`,
    schemas: {
        body: v.object({
            idApiKey: apiKeySchema.entries.id,
        }),
        return: v.object({}),
    },
})
