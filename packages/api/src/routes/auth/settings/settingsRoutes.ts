import { deleteUserRoute } from "./deleteUser.js"
import { readUserSessionRoute } from "./readUserSession.js"
import { updateUserRoute } from "./updateUser.js"
import { updateUserEmailRoute } from "./updateUserEmail.js"
import { updateUserPasswordRoute } from "./updateUserPassword.js"

export const settingsRoutes = [
    deleteUserRoute,
    readUserSessionRoute,
    updateUserRoute,
    updateUserEmailRoute,
    updateUserPasswordRoute,
]
