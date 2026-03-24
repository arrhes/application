import { deleteOneEntryRoute } from "./deleteOneEntry.js"
import { duplicateOneEntryRoute } from "./duplicateOneEntry.js"
import { readOneEntryRoute } from "./readOneEntry.js"
import { updateOneEntryRoute } from "./updateOneEntry.js"

export const $idEntryRoutes = [deleteOneEntryRoute, duplicateOneEntryRoute, readOneEntryRoute, updateOneEntryRoute]
