import { apiFactory } from "../utilities/apiFactory.js"
import { authRoute } from "./auth/authRoute.js"
import { internalRoute } from "./internal/internalRoute.js"
import { publicRoute } from "./public/publicRoute.js"

export const routes = apiFactory.createApp().route("/", authRoute).route("/", publicRoute).route("/", internalRoute)
