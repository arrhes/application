import { $idRecordLabelRoutes } from "./$idRecordLabel/$idRecordLabelRoutes.js"
import { createOneRecordLabelRoute } from "./createOneRecordLabel.js"
import { readAllRecordLabelsRoute } from "./readAllRecordLabels.js"

export const recordLabelsRoutes = [
    createOneRecordLabelRoute,
    readAllRecordLabelsRoute,

    ...$idRecordLabelRoutes,
]
