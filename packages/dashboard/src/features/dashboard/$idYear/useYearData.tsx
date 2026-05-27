import { useContext } from "react"
import { YearDataContext, type YearDataContextValue } from "./YearDataProvider.js"

export function useYearData(): YearDataContextValue {
    const context = useContext(YearDataContext)
    if (context === null) {
        throw new Error("useYearData must be used within a YearDataProvider")
    }
    return context
}
