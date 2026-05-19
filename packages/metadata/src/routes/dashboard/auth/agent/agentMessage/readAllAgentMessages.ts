import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { idSchema } from "../../../../../components/schemas/idSchema.js"
import { agentMessageSchemaReturn } from "../../../../../schemas/agentMessage.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const readAllAgentMessagesRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/agent/sessions/:idAgentSession/messages`,
    schemas: {
        body: v.object({
            idAgentSession: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: v.array(agentMessageSchemaReturn),
    },
})
