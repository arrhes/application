import { apiFactory } from "../../utilities/apiFactory.js"
import { readAdminUserSessionRoute } from "./auth/readAdminUserSession.js"
import { adminSignInRoute } from "./auth/signIn.js"
import { adminSignOutRoute } from "./auth/signOut.js"
import { adminTicketRoutes } from "./ticket/adminTicketRoutes.js"

export const adminRoute = apiFactory.createApp()

export const adminRoutes = [adminSignInRoute, adminSignOutRoute, readAdminUserSessionRoute, ...adminTicketRoutes]

for (const route of adminRoutes) {
    adminRoute.route("/", route)
}
