import type { AnyRoute } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "./root/dashboard/dashboardLayoutRoute.js"
import { dashboardRoute } from "./root/dashboard/dashboardRoute.js"
import { $idTicketLayoutRoute } from "./root/dashboard/tickets/$idTicket/$idTicketLayoutRoute.js"
import { $idTicketRoute } from "./root/dashboard/tickets/$idTicket/$idTicketRoute.js"
import { ticketsLayoutRoute } from "./root/dashboard/tickets/ticketsLayoutRoute.js"
import { ticketsRoute } from "./root/dashboard/tickets/ticketsRoute.js"
import { rootLayoutRoute } from "./root/rootLayoutRoute.js"
import { rootRoute } from "./root/rootRoute.js"
import { signInRoute } from "./root/signIn/signInRoute.js"

export const adminTree: AnyRoute = rootLayoutRoute.addChildren([
    rootRoute,
    signInRoute,
    dashboardLayoutRoute.addChildren([
        dashboardRoute,
        ticketsLayoutRoute.addChildren([ticketsRoute, $idTicketLayoutRoute.addChildren([$idTicketRoute])]),
    ]),
])
