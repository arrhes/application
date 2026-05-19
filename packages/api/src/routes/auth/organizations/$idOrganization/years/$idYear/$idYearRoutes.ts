import { entriesRoutes } from "./entries/entriesRoutes.js"
import { exportsRoutes } from "./exports/exportsRoutes.js"
import { filesRoutes } from "./files/filesRoutes.js"
import { foldersRoutes } from "./folders/foldersRoutes.js"
import { readOneYearRoute } from "./readOneYear.js"
import { yearSettingsRoute } from "./yearSettings/yearSettingsRoute.js"

export const $idYearRoutes = [
    readOneYearRoute,

    ...entriesRoutes,
    ...exportsRoutes,
    ...filesRoutes,
    ...foldersRoutes,
    ...yearSettingsRoute,
]
