import { useContext } from "react"
import { TabsContext, type TabsContextValue } from "./tabsContext.js"

export function useTabs(): TabsContextValue {
    const ctx = useContext(TabsContext)
    if (ctx === null) {
        throw new Error("useTabs must be used within a TabsProvider")
    }
    return ctx
}
