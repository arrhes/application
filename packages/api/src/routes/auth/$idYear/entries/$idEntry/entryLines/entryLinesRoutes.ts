import { $idEntryLineRoutes } from "./$idEntryLine/$idEntryLineRoutes.js"
import { createOneEntryLineRoute } from "./createOneEntryLine.js"
import { readAllEntryLinesRoute } from "./readAllEntryLines.js"
import { updateManyEntryLinesRoute } from "./updateManyEntryLines.js"

export const entryLinesRoutes = [
    createOneEntryLineRoute,
    readAllEntryLinesRoute,
    updateManyEntryLinesRoute,

    ...$idEntryLineRoutes,
]
