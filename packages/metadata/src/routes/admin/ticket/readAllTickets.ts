import * as v from "valibot"
import { routePath } from "../../../components/index.js"
import { ticketSchemaReturn } from "../../../schemas/ticket.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"

export const adminReadAllTicketsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.admin}/read-all-tickets`,
    schemas: {
        body: v.object({}),
        return: v.array(ticketSchemaReturn),
    },
})
