import { createOneTicketRoute } from "./createOneTicket.js"
import { createOneTicketMessageRoute } from "./createOneTicketMessage.js"
import { readAllTicketMessagesRoute } from "./readAllTicketMessages.js"
import { readAllTicketsRoute } from "./readAllTickets.js"
import { readOneTicketRoute } from "./readOneTicket.js"
import { updateOneTicketRoute } from "./updateOneTicket.js"
import { updateOneTicketStatusRoute } from "./updateOneTicketStatus.js"

export const supportRoutes = [
    createOneTicketRoute,
    createOneTicketMessageRoute,
    readAllTicketMessagesRoute,
    readAllTicketsRoute,
    readOneTicketRoute,
    updateOneTicketRoute,
    updateOneTicketStatusRoute,
]
