import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const updateUserOcrCredentialsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "PATCH",
    path: `${routePath.v1}/user/ocr-credentials`,
    name: "update-user-ocr-credentials",
    schemas: {
        body: v.object({
            ocrEndpoint: v.optional(v.nullable(v.string())),
            ocrApiKey: v.optional(v.nullable(v.string())),
            ocrModel: v.optional(v.nullable(v.string())),
        }),
        return: v.object({
            success: v.boolean(),
        }),
    },
})
