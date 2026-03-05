import { mollieWebhookRoute } from "../../routes/public/mollieWebhook.js"
import { sendMagicLinkRoute } from "../../routes/public/sendMagicLink.js"
import { signInRoute } from "../../routes/public/signIn.js"
import { signOutRoute } from "../../routes/public/signOut.js"
import { signUpRoute } from "../../routes/public/signUp.js"
import { apiFactory } from "../../utilities/apiFactory.js"

export const publicRoute = apiFactory
    .createApp()
    .route("/", signInRoute)
    .route("/", signUpRoute)
    .route("/", signOutRoute)
    .route("/", sendMagicLinkRoute)
    .route("/", mollieWebhookRoute)
