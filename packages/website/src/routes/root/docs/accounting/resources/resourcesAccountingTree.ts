import type { AnyRoute } from "@tanstack/react-router"
import { accountAccountingDocRoute } from "./accounts/accountAccountingDocRoute.tsx"
import { accountsAccountingDocLayoutRoute } from "./accounts/accountsAccountingDocLayoutRoute.tsx"
import { accountsAccountingDocRoute } from "./accounts/accountsAccountingDocRoute.tsx"
import { glossaryAccountingDocLayoutRoute } from "./glossary/glossaryAccountingDocLayoutRoute.tsx"
import { glossaryAccountingDocIndexRoute } from "./glossary/glossaryAccountingDocRoute.tsx"
import { glossaryTermAccountingDocRoute } from "./glossary/glossaryTermAccountingDocRoute.tsx"
import { resourcesAccountingDocLayoutRoute } from "./resourcesAccountingDocLayoutRoute.tsx"
import { scenarioAccountingDocRoute } from "./scenarios/scenarioAccountingDocRoute.tsx"
import { scenariosAccountingDocLayoutRoute } from "./scenarios/scenariosAccountingDocLayoutRoute.tsx"
import { scenariosAccountingDocIndexRoute } from "./scenarios/scenariosAccountingDocRoute.tsx"

export const resourcesAccountingTree: AnyRoute = resourcesAccountingDocLayoutRoute.addChildren([
    accountsAccountingDocLayoutRoute.addChildren([
        accountsAccountingDocRoute,
        accountAccountingDocRoute,
    ]),
    scenariosAccountingDocLayoutRoute.addChildren([
        scenariosAccountingDocIndexRoute,
        scenarioAccountingDocRoute,
    ]),
    glossaryAccountingDocLayoutRoute.addChildren([
        glossaryAccountingDocIndexRoute,
        glossaryTermAccountingDocRoute,
    ]),
])
