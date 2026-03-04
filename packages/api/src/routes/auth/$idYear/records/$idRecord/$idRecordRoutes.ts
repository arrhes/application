import { deleteOneRecordRoute } from "./deleteOneRecord.js"
import { duplicateOneRecordRoute } from "./duplicateOneRecord.js"
import { readOneRecordRoute } from "./readOneRecord.js"
import { updateOneRecordRoute } from "./updateOneRecord.js"

export const $idRecordRoutes = [deleteOneRecordRoute, duplicateOneRecordRoute, readOneRecordRoute, updateOneRecordRoute]
