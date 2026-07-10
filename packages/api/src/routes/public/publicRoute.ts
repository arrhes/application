import { apiFactory } from "../../utilities/apiFactory.js"
import { resetPasswordRoute } from "./user/resetPassword.js"
import { sendMagicLinkRoute } from "./user/sendMagicLink.js"
import { signInRoute } from "./user/signIn.js"
import { signOutRoute } from "./user/signOut.js"
import { signUpRoute } from "./user/signUp.js"

export const publicRoute = apiFactory
    .createApp()
    .route("/", signInRoute)
    .route("/", signUpRoute)
    .route("/", signOutRoute)
    .route("/", sendMagicLinkRoute)
    .route("/", resetPasswordRoute)
