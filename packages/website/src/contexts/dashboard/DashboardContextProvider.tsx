import type { ReactNode } from "react"
import { useCallback, useState } from "react"
import { setCookie } from "../../utilities/cookies/setCookie.js"
import { cookiePrefix } from "../../utilities/variables.js"
import { DashboardContext } from "./dashboardContext.js"

const SELECTED_ORG_KEY = "arrhes:context-org"
const SELECTED_YEAR_KEY = "arrhes:context-year"

function readStorage(key: string): string | null {
    try {
        return localStorage.getItem(key)
    } catch {
        return null
    }
}

function writeStorage(key: string, value: string | null): void {
    try {
        if (value !== null) localStorage.setItem(key, value)
        else localStorage.removeItem(key)
    } catch {}
}

export function DashboardContextProvider(props: { children: ReactNode }) {
    const [selectedOrgId, setSelectedOrgId] = useState<string | null>(() => {
        const id = readStorage(SELECTED_ORG_KEY)
        if (id !== null) setCookie(`${cookiePrefix}_id_organization`, id)
        return id
    })

    const [selectedYearId, setSelectedYearId] = useState<string | null>(() => readStorage(SELECTED_YEAR_KEY))

    const setOrg = useCallback((id: string | null) => {
        setSelectedOrgId(id)
        writeStorage(SELECTED_ORG_KEY, id)
        if (id !== null) setCookie(`${cookiePrefix}_id_organization`, id)
        setSelectedYearId(null)
        writeStorage(SELECTED_YEAR_KEY, null)
    }, [])

    const setYear = useCallback((id: string | null) => {
        setSelectedYearId(id)
        writeStorage(SELECTED_YEAR_KEY, id)
    }, [])

    return (
        <DashboardContext.Provider
            value={{
                selectedOrgId,
                selectedYearId,
                setOrg,
                setYear,
            }}
        >
            {props.children}
        </DashboardContext.Provider>
    )
}
