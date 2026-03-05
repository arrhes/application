import { activateUserRoute } from "../../../routes/auth/settings/activateUser.js"
import { readUserSessionRoute } from "../../../routes/auth/settings/readUserSession.js"
import { updateUserRoute } from "../../../routes/auth/settings/updateUser.js"
import { updateUserEmailRoute } from "../../../routes/auth/settings/updateUserEmail.js"
import { updateUserPasswordRoute } from "../../../routes/auth/settings/updateUserPassword.js"
import { validateUserEmailRoute } from "../../../routes/auth/settings/validateUserEmail.js"

export const settingsRoutes = [
    activateUserRoute,
    readUserSessionRoute,
    updateUserRoute,
    updateUserEmailRoute,
    updateUserPasswordRoute,
    validateUserEmailRoute,
]
