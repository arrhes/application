import { $idFileRoutes } from "./$idFile/$idFileRoutes.js"
import { createOneFileRoute } from "./createOneFile.js"
import { readAllFilesRoute } from "./readAllFiles.js"

export const filesRoutes = [
    createOneFileRoute,
    readAllFilesRoute,

    ...$idFileRoutes,
]
