import { apiFactory } from "../../utilities/apiFactory.js"
import { adminRoutes } from "./admin/adminRoutes.js"
import { agentRoutes } from "./agent/agentRoutes.js"
import { organizationsRoutes } from "./organizations/organizationsRoutes.js"
import { settingsRoutes } from "./settings/settingsRoutes.js"
import { supportRoutes } from "./support/supportRoutes.js"
import { userRoutes } from "./user/userRoutes.js"

export const authRoute = apiFactory.createApp()

export const authRoutes = [
    ...adminRoutes,
    ...agentRoutes,
    ...organizationsRoutes,
    ...settingsRoutes,
    ...supportRoutes,
    ...userRoutes,
]

for (const route of authRoutes) {
    authRoute.route("/", route)
}
