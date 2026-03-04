import { $idRecordRoutes } from "./$idRecord/$idRecordRoutes.js"
import { createOneRecordRoute } from "./createOneRecord.js"
import { createOneRecordFromTemplateRoute } from "./createOneRecordFromTemplate.js"
import { readAllRecordsRoute } from "./readAllRecords.js"
import { recordRowsRoutes } from "./recordRows/recordRowsRoutes.js"

export const recordsRoutes = [
    createOneRecordRoute,
    createOneRecordFromTemplateRoute,
    readAllRecordsRoute,

    ...$idRecordRoutes,
    ...recordRowsRoutes,
]
