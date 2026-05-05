import { authRoute } from "../routes/auth/authRoute.js"
import { internalRoute } from "../routes/internal/internalRoute.js"
import { publicRoute } from "../routes/public/publicRoute.js"
import { apiFactory } from "../utilities/apiFactory.js"

export const routes = apiFactory.createApp().route("/", authRoute).route("/", publicRoute).route("/", internalRoute)
