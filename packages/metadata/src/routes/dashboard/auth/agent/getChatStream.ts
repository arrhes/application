import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { idSchema } from "../../../../components/schemas/idSchema.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const getChatStreamRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/agent/sessions/:idAgentSession/stream`,
    schemas: {
        body: v.object({
            idAgentMessage: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: v.object({}),
    },
})
