import { $idDocumentRoutes } from "./$idDocument/$idDocumentRoutes.js"
import { readAllDocumentsRoute } from "./readAllDocuments.js"

export const documentsRoutes = [
    readAllDocumentsRoute,

    ...$idDocumentRoutes,
]
