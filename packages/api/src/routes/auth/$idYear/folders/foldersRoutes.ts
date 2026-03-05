import { $idFolderRoutes } from "./$idFolder/$idFolderRoutes.js"
import { createOneFolderRoute } from "./createOneFolder.js"
import { readAllFoldersRoute } from "./readAllFolders.js"

export const foldersRoutes = [
    createOneFolderRoute,
    readAllFoldersRoute,

    ...$idFolderRoutes,
]
