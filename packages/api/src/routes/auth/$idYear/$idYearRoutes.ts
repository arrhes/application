import { filesRoutes } from "./files/filesRoutes.js"
import { foldersRoutes } from "./folders/foldersRoutes.js"
import { readOneYearRoute } from "./readOneYear.js"
import { recordsRoutes } from "./records/recordsRoutes.js"
import { reportsRoutes } from "./reports/reportsRoutes.js"
import { yearSettingsRoute } from "./yearSettings/yearSettingsRoute.js"

export const $idYearRoutes = [
    readOneYearRoute,

    ...recordsRoutes,
    ...filesRoutes,
    ...foldersRoutes,
    ...reportsRoutes,
    ...yearSettingsRoute,
]
