import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const updateUserLlmCredentialsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "PATCH",
    path: `${routePath.v1}/user/llm-credentials`,
    name: "update-user-llm-credentials",
    schemas: {
        body: v.object({
            llmProvider: v.optional(v.nullable(v.string())),
            llmApiKey: v.optional(v.nullable(v.string())),
            llmBaseUrl: v.optional(v.nullable(v.string())),
            llmModel: v.optional(v.nullable(v.string())),
            ocrApiKey: v.optional(v.nullable(v.string())),
        }),
        return: v.object({
            success: v.boolean(),
        }),
    },
})
