import { organizationsRoutes } from "../../routes/auth/organizations/organizationsRoutes.js"
import { settingsRoutes } from "../../routes/auth/settings/settingsRoutes.js"
import { supportRoutes } from "../../routes/auth/support/supportRoutes.js"
import { apiFactory } from "../../utilities/apiFactory.js"

export const authRoute = apiFactory.createApp()

export const authRoutes = [...organizationsRoutes, ...settingsRoutes, ...supportRoutes]

for (const route of authRoutes) {
    authRoute.route("/", route)
}
