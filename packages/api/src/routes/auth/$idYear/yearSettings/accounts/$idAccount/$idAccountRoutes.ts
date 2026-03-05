import { deleteOneAccountRoute } from "./deleteOneAccount.js"
import { readOneAccountRoute } from "./readOneAccount.js"
import { updateOneAccountRoute } from "./updateOneAccount.js"

export const $idAccountRoutes = [deleteOneAccountRoute, readOneAccountRoute, updateOneAccountRoute]
