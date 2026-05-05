import { deleteOneFileRoute } from "./deleteOneFile.js"
import { generateFileGetSignedUrlRoute } from "./generateFileGetSignedUrl.js"
import { generateFilePutSignedUrlRoute } from "./generateFilePutSignedUrl.js"
import { ocrFileRoute } from "./ocrFile.js"
import { readOneFileRoute } from "./readOneFile.js"
import { updateOneFileRoute } from "./updateOneFile.js"

export const $idFileRoutes = [
    deleteOneFileRoute,
    generateFileGetSignedUrlRoute,
    generateFilePutSignedUrlRoute,
    ocrFileRoute,
    readOneFileRoute,
    updateOneFileRoute,
]
