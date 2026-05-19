import type { AnyRoute } from "@tanstack/react-router"
import { commandsCliDocLayoutRoute } from "../commandsCliDocRoute.js"
import { balanceSheetsCommandsCliDocRoute } from "./balanceSheetsCommandsCliDocRoute.js"
import { clesApiCommandsCliDocRoute } from "./clesApiCommandsCliDocRoute.js"
import { comptesCommandsCliDocRoute } from "./comptesCommandsCliDocRoute.js"
import { ecrituresCommandsCliDocRoute } from "./ecrituresCommandsCliDocRoute.js"
import { exercicesCommandsCliDocRoute } from "./exercicesCommandsCliDocRoute.js"
import { exportsCommandsCliDocRoute } from "./exportsCommandsCliDocRoute.js"
import { fichiersCommandsCliDocRoute } from "./fichiersCommandsCliDocRoute.js"
import { incomeStatementsCommandsCliDocRoute } from "./incomeStatementsCommandsCliDocRoute.js"
import { journauxCommandsCliDocRoute } from "./journauxCommandsCliDocRoute.js"
import { libellesCommandsCliDocRoute } from "./libellesCommandsCliDocRoute.js"
import { membresCommandsCliDocRoute } from "./membresCommandsCliDocRoute.js"
import { orgCommandsCliDocRoute } from "./orgCommandsCliDocRoute.js"

export const commandsCliDocTree: AnyRoute = commandsCliDocLayoutRoute.addChildren([
    orgCommandsCliDocRoute,
    exercicesCommandsCliDocRoute,
    journauxCommandsCliDocRoute,
    comptesCommandsCliDocRoute,
    libellesCommandsCliDocRoute,
    ecrituresCommandsCliDocRoute,
    fichiersCommandsCliDocRoute,
    membresCommandsCliDocRoute,
    clesApiCommandsCliDocRoute,
    exportsCommandsCliDocRoute,
    balanceSheetsCommandsCliDocRoute,
    incomeStatementsCommandsCliDocRoute,
])
