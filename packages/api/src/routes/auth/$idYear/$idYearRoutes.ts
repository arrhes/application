import { entriesRoutes } from "./entries/entriesRoutes.js"
import { filesRoutes } from "./files/filesRoutes.js"
import { foldersRoutes } from "./folders/foldersRoutes.js"
import { readOneYearRoute } from "./readOneYear.js"
import { reportsRoutes } from "./reports/reportsRoutes.js"
import { yearSettingsRoute } from "./yearSettings/yearSettingsRoute.js"

export const $idYearRoutes = [
    readOneYearRoute,

    ...entriesRoutes,
    ...filesRoutes,
    ...foldersRoutes,
    ...reportsRoutes,
    ...yearSettingsRoute,
]
