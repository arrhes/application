import { $idYearRoutes } from "../../$idYear/$idYearRoutes.js"
import { createOneYearRoute } from "./createOneYear.js"
import { readAllYearsRoute } from "./readAllYears.js"

export const yearsRoutes = [
    createOneYearRoute,
    readAllYearsRoute,

    ...$idYearRoutes,
]
