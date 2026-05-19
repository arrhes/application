import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { idSchema } from "../../../../components/schemas/idSchema.js"
import { ticketMessageSchemaReturn } from "../../../../schemas/ticketMessage.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const readAllTicketMessagesRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/support/tickets/:idTicket/messages`,
    schemas: {
        body: v.object({
            idTicket: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: v.array(ticketMessageSchemaReturn),
    },
})
