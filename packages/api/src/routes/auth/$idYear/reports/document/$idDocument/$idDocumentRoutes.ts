import { generateDocumentGetSignedUrlRoute } from "./generateDocumentGetSignedUrl.js"
import { readOneDocumentRoute } from "./readOneDocument.js"

export const $idDocumentRoutes = [generateDocumentGetSignedUrlRoute, readOneDocumentRoute]
