import { executeScenarioRoute } from "./executeScenario.js"
import { readAllScenariosRoute } from "./readAllScenarios.js"
import { readOneScenarioRoute } from "./readOneScenario.js"

export const scenariosRoutes = [
    readAllScenariosRoute,
    readOneScenarioRoute,
    executeScenarioRoute,
]
