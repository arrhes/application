import { apiFactory } from "../../utilities/apiFactory.js"
import { organizationsRoutes } from "./organizations/organizationsRoutes.js"
import { settingsRoutes } from "./settings/settingsRoutes.js"
import { userRoutes } from "./user/userRoutes.js"

export const authRoute = apiFactory.createApp()

export const authRoutes = [
    ...organizationsRoutes,
    ...settingsRoutes,
    ...userRoutes,
]

for (const route of authRoutes) {
    authRoute.route("/", route)
}
