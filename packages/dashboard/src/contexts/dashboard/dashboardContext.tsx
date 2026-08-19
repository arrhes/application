import { createContext } from "react"

export type DashboardContextValue = {
    selectedOrgId: string | null
    selectedYearId: string | null
    setOrg: (id: string | null) => void
    setYear: (id: string | null) => void
}

export const DashboardContext = createContext<DashboardContextValue | null>(null)
