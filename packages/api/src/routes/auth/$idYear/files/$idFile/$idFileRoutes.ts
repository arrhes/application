import { deleteOneFileRoute } from "./deleteOneFile.js"
import { finalizeFileUploadRoute } from "./finalizeFileUpload.js"
import { generateFileDeleteSignedUrlRoute } from "./generateFileDeleteSignedUrl.js"
import { generateFileGetSignedUrlRoute } from "./generateFileGetSignedUrl.js"
import { generateFilePutSignedUrlRoute } from "./generateFilePutSignedUrl.js"
import { ocrFileRoute } from "./ocrFile.js"
import { readOneFileRoute } from "./readOneFile.js"
import { updateOneFileRoute } from "./updateOneFile.js"

export const $idFileRoutes = [
    deleteOneFileRoute,
    finalizeFileUploadRoute,
    generateFileDeleteSignedUrlRoute,
    generateFileGetSignedUrlRoute,
    generateFilePutSignedUrlRoute,
    ocrFileRoute,
    readOneFileRoute,
    updateOneFileRoute,
]
