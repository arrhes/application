import { apiFactory } from "../../utilities/apiFactory.js"
import { adminRoutes } from "./admin/adminRoutes.js"
import { agentRoutes } from "./agent/agentRoutes.js"
import { organizationsRoutes } from "./organizations/organizationsRoutes.js"
import { settingsRoutes } from "./settings/settingsRoutes.js"
import { supportRoutes } from "./support/supportRoutes.js"

export const authRoute = apiFactory.createApp()

export const authRoutes = [
    ...adminRoutes,
    ...agentRoutes,
    ...organizationsRoutes,
    ...settingsRoutes,
    ...supportRoutes,
]

for (const route of authRoutes) {
    authRoute.route("/", route)
}
