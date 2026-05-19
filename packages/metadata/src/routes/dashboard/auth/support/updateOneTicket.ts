import * as v from "valibot"
import { routePath, ticketStatus, ticketType } from "../../../../components/index.js"
import { idSchema } from "../../../../components/schemas/idSchema.js"
import { ticketSchemaReturn } from "../../../../schemas/ticket.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const updateOneTicketRouteDefinition = routeDefinition({
    protocol: "http",
    method: "PATCH",
    path: `${routePath.v1}/support/tickets/:idTicket`,
    schemas: {
        body: v.object({
            idTicket: v.nonNullable(idSchema, "Ce champ est requis"),
            status: v.optional(v.picklist(ticketStatus, "Valeur invalide")),
            category: v.optional(v.picklist(ticketType, "Valeur invalide")),
        }),
        return: ticketSchemaReturn,
    },
})
