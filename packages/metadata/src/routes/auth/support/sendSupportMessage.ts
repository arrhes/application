import * as v from "valibot"
import { routePath, ticketType } from "../../../components/index.js"
import { stringSchema } from "../../../components/schemas/stringSchema.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"

export const sendSupportMessageRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/send-support-message`,
    schemas: {
        body: v.object({
            category: v.nullable(v.picklist(ticketType, "Valeur invalide")),
            message: v.nonNullable(stringSchema, "Ce champ est requis"),
        }),
        return: v.object({}),
    },
})
