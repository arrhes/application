import { createContext, useContext } from "react"

export type DashboardContextValue = {
    selectedOrgId: string | null
    selectedYearId: string | null
    setOrg: (id: string | null) => void
    setYear: (id: string | null) => void
}

export const DashboardContext = createContext<DashboardContextValue | null>(null)

export function useDashboardContext(): DashboardContextValue {
    const ctx = useContext(DashboardContext)
    if (ctx === null) throw new Error("useDashboardContext must be used inside DashboardContextProvider")
    return ctx
}
