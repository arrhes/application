import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { idSchema } from "../../../../components/schemas/idSchema.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const undoAgentActionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/undo-agent-action`,
    schemas: {
        body: v.object({
            idAgentMessage: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: v.object({}),
    },
})
