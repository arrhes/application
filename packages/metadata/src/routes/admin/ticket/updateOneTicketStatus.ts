import * as v from "valibot"
import { routePath, ticketStatus } from "../../../components/index.js"
import { idSchema } from "../../../components/schemas/idSchema.js"
import { ticketSchemaReturn } from "../../../schemas/ticket.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"

export const adminUpdateOneTicketStatusRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.admin}/update-one-ticket-status`,
    schemas: {
        body: v.object({
            idTicket: v.nonNullable(idSchema, "Ce champ est requis"),
            status: v.picklist(ticketStatus, "Valeur invalide"),
        }),
        return: ticketSchemaReturn,
    },
})
