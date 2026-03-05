import type { balanceSheetFlow } from "./balanceSheetFlow.js"
import type { balanceSheetSide } from "./balanceSheetSide.js"

export type DefaultBalanceSheet = {
    side: (typeof balanceSheetSide)[number]
    number: number
    label: string
    numberParent: number | undefined
    accounts: Array<{
        number: number
        flow: (typeof balanceSheetFlow)[number]
        isAmortization: boolean
    }>
}
