import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { idSchema } from "../../../../../components/schemas/idSchema.js"
import { agentMessageSchemaReturn } from "../../../../../schemas/agentMessage.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const readAllAgentMessagesRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-agent-messages`,
    schemas: {
        body: v.object({
            idAgentSession: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: v.array(agentMessageSchemaReturn),
    },
})
