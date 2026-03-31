import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { idSchema } from "../../../../components/schemas/idSchema.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const deleteOneAgentSessionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-agent-session`,
    schemas: {
        body: v.object({
            idAgentSession: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: v.object({}),
    },
})
