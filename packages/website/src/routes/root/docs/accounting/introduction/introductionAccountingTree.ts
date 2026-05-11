import type { AnyRoute } from "@tanstack/react-router"
import { accountsAccountingDocRoute } from "./accountsAccountingDocRoute.tsx"
import { classesAccountingDocRoute } from "./classesAccountingDocRoute.tsx"
import { doubleEntryAccountingDocRoute } from "./doubleEntryAccountingDocRoute.tsx"
import { entriesAccountingDocRoute } from "./entriesAccountingDocRoute.tsx"
import { introductionAccountingDocLayoutRoute } from "./introductionAccountingDocLayoutRoute.tsx"
import { introductionAccountingDocRoute } from "./introductionAccountingDocRoute.tsx"


export const introductionAccountingTree: AnyRoute = introductionAccountingDocLayoutRoute.addChildren([
    introductionAccountingDocRoute,
    doubleEntryAccountingDocRoute,
    entriesAccountingDocRoute,
    accountsAccountingDocRoute,
    classesAccountingDocRoute,
])
