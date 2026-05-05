import * as v from "valibot"
import { routePath } from "../../../components/index.js"
import { idSchema } from "../../../components/schemas/idSchema.js"
import { ticketMessageSchemaReturn } from "../../../schemas/ticketMessage.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"

export const adminCreateOneTicketMessageRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.admin}/create-one-ticket-message`,
    schemas: {
        body: v.object({
            idTicket: v.nonNullable(idSchema, "Ce champ est requis"),
            message: v.pipe(v.string("Ce champ est requis"), v.minLength(1, "Ce champ est requis")),
        }),
        return: ticketMessageSchemaReturn,
    },
})
