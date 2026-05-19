import { activateUserRoute } from "./activateUser.js"
import { deleteUserRoute } from "./deleteUser.js"
import { readUserSessionRoute } from "./readUserSession.js"
import { resendEmailValidationRoute } from "./resendEmailValidation.js"
import { updateUserRoute } from "./updateUser.js"
import { updateUserEmailRoute } from "./updateUserEmail.js"
import { updateUserPasswordRoute } from "./updateUserPassword.js"
import { validateUserEmailRoute } from "./validateUserEmail.js"

export const settingsRoutes = [
    activateUserRoute,
    deleteUserRoute,
    readUserSessionRoute,
    resendEmailValidationRoute,
    updateUserRoute,
    updateUserEmailRoute,
    updateUserPasswordRoute,
    validateUserEmailRoute,
]
