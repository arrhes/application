import * as v from "valibot"
import { routePath } from "../../../../../../components/index.js"
import { apiKeySchemaReturn } from "../../../../../../schemas/apiKey.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"

export const readAllApiKeysRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-api-keys`,
    schemas: {
        body: v.object({}),
        return: v.array(apiKeySchemaReturn),
    },
})
