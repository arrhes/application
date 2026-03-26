import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { idSchema } from "../../../../components/schemas/idSchema.js"
import { ticketMessageSchemaReturn } from "../../../../schemas/ticketMessage.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const readAllTicketMessagesRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-ticket-messages`,
    schemas: {
        body: v.object({
            idTicket: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: v.array(ticketMessageSchemaReturn),
    },
})
