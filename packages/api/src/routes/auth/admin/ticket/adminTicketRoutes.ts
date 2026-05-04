import { adminCreateOneTicketMessageRoute } from "./createOneTicketMessage.js"
import { adminReadAllTicketMessagesRoute } from "./readAllTicketMessages.js"
import { adminReadAllTicketsRoute } from "./readAllTickets.js"
import { adminReadOneTicketRoute } from "./readOneTicket.js"
import { adminUpdateOneTicketStatusRoute } from "./updateOneTicketStatus.js"

export const adminTicketRoutes = [
    adminCreateOneTicketMessageRoute,
    adminReadAllTicketMessagesRoute,
    adminReadAllTicketsRoute,
    adminReadOneTicketRoute,
    adminUpdateOneTicketStatusRoute,
]
