import type { AnyRoute } from "@tanstack/react-router"
import { balanceAccountingDocRoute } from "./balanceAccountingDocRoute.tsx"
import { balanceSheetAccountingDocRoute } from "./balanceSheetAccountingDocRoute.tsx"
import { fecAccountingDocRoute } from "./fecAccountingDocRoute.tsx"
import { incomeStatementAccountingDocRoute } from "./incomeStatementAccountingDocRoute.tsx"
import { journalAccountingDocRoute } from "./journalAccountingDocRoute.tsx"
import { ledgerAccountingDocRoute } from "./ledgerAccountingDocRoute.tsx"
import { notesAccountingDocRoute } from "./notesAccountingDocRoute.tsx"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.tsx"
import { reportsAccountingDocRoute } from "./reportsAccountingDocRoute.tsx"

export const reportsAccountingTree: AnyRoute = reportsAccountingDocLayoutRoute.addChildren([
    balanceSheetAccountingDocRoute,
    incomeStatementAccountingDocRoute,
    balanceAccountingDocRoute,
    journalAccountingDocRoute,
    ledgerAccountingDocRoute,
    fecAccountingDocRoute,
    notesAccountingDocRoute,
    reportsAccountingDocRoute,
])
