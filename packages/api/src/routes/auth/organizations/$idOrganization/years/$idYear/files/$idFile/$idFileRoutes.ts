import { deleteOneFileRoute } from "./deleteOneFile.js"
import { downloadFileRoute } from "./downloadFile.js"
import { ocrFileRoute } from "./ocrFile.js"
import { readOneFileRoute } from "./readOneFile.js"
import { updateOneFileRoute } from "./updateOneFile.js"

export const $idFileRoutes = [
    deleteOneFileRoute,
    downloadFileRoute,
    ocrFileRoute,
    readOneFileRoute,
    updateOneFileRoute,
]
