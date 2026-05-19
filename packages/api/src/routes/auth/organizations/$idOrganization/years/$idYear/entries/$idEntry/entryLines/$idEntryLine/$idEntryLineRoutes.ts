import { deleteOneEntryLineRoute } from "./deleteOneEntryLine.js"
import { readOneEntryLineRoute } from "./readOneEntryLine.js"
import { updateOneEntryLineRoute } from "./updateOneEntryLine.js"

export const $idEntryLineRoutes = [
    deleteOneEntryLineRoute,
    readOneEntryLineRoute,
    updateOneEntryLineRoute,
]
