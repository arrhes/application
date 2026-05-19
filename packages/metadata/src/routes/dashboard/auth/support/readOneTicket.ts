import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { idSchema } from "../../../../components/schemas/idSchema.js"
import { ticketSchemaReturn } from "../../../../schemas/ticket.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const readOneTicketRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/support/tickets/:idTicket`,
    schemas: {
        body: v.object({
            idTicket: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: ticketSchemaReturn,
    },
})
