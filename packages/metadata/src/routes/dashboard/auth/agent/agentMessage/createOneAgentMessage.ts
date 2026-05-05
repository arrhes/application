import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { idSchema } from "../../../../../components/schemas/idSchema.js"
import { agentMessageSchemaReturn } from "../../../../../schemas/agentMessage.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const createOneAgentMessageRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-agent-message`,
    schemas: {
        body: v.object({
            idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
            idAgentSession: v.nonNullable(idSchema, "Ce champ est requis"),
            message: v.nonNullable(v.string(), "Ce champ est requis"),
            references: v.optional(
                v.nullable(
                    v.array(
                        v.object({
                            id: v.nonNullable(idSchema, "Ce champ est requis"),
                            type: v.picklist(["account", "entry", "journal", "tag", "file"]),
                            label: v.string(),
                        }),
                    ),
                ),
            ),
        }),
        return: agentMessageSchemaReturn,
    },
})
