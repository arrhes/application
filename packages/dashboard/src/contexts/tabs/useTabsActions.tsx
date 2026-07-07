import { use } from "react"
import { TabsContext, type TabsContextValue } from "./tabsContext.js"

export function useTabsActions(): TabsContextValue {
    const ctx = use(TabsContext)
    if (ctx === null) {
        throw new Error("useTabsActions must be used within a TabsProvider")
    }
    return ctx
}
