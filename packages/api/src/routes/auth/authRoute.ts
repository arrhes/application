import { apiFactory } from "../../utilities/apiFactory.js"
import { agentRoutes } from "./agent/agentRoutes.js"
import { organizationsRoutes } from "./organizations/organizationsRoutes.js"
import { settingsRoutes } from "./settings/settingsRoutes.js"
import { userRoutes } from "./user/userRoutes.js"

export const authRoute = apiFactory.createApp()

export const authRoutes = [
    ...agentRoutes,
    ...organizationsRoutes,
    ...settingsRoutes,
    ...userRoutes,
]

for (const route of authRoutes) {
    authRoute.route("/", route)
}
