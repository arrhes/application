import * as v from "valibot"
import { routePath, ticketType } from "../../../../components/index.js"
import { ticketSchemaReturn } from "../../../../schemas/ticket.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const createOneTicketRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/support/tickets`,
    schemas: {
        body: v.object({
            category: v.picklist(ticketType, "Valeur invalide"),
            message: v.pipe(v.string("Ce champ est requis"), v.minLength(1, "Ce champ est requis")),
        }),
        return: ticketSchemaReturn,
    },
})
