import { entriesRoutes } from "./entries/entriesRoutes.js"
import { readOneYearRoute } from "./readOneYear.js"
import { reportsRoutes } from "./reports/reportsRoutes.js"
import { yearSettingsRoute } from "./yearSettings/yearSettingsRoute.js"

export const $idYearRoutes = [
    readOneYearRoute,

    ...entriesRoutes,
    ...reportsRoutes,
    ...yearSettingsRoute,
]
