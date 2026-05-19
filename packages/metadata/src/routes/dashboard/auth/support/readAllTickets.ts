import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { ticketSchemaReturn } from "../../../../schemas/ticket.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const readAllTicketsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/support/tickets`,
    schemas: {
        body: v.object({}),
        return: v.array(ticketSchemaReturn),
    },
})
