import { $idRecordRowRoutes } from "./$idRecordRow/$idRecordRowRoutes.js"
import { createOneRecordRowRoute } from "./createOneRecordRow.js"
import { readAllRecordRowsRoute } from "./readAllRecordRows.js"
import { updateManyRecordRowsRoute } from "./updateManyRecordRows.js"

export const recordRowsRoutes = [
    createOneRecordRowRoute,
    readAllRecordRowsRoute,
    updateManyRecordRowsRoute,

    ...$idRecordRowRoutes,
]
