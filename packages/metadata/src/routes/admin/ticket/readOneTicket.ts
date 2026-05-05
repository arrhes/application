import * as v from "valibot"
import { routePath } from "../../../components/index.js"
import { idSchema } from "../../../components/schemas/idSchema.js"
import { ticketSchemaReturn } from "../../../schemas/ticket.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"

export const adminReadOneTicketRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.admin}/read-one-ticket`,
    schemas: {
        body: v.object({
            idTicket: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: ticketSchemaReturn,
    },
})
