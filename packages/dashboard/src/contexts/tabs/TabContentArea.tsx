import type { Tab } from "./tabsContext.js"

type TabContentAreaProps = {
    activeTabId: string | null
    tabs: Tab[]
}

export function TabContentArea({ activeTabId, tabs }: TabContentAreaProps) {
    return (
        <>
            {tabs.map((tab) => {
                if (tab.id !== activeTabId) return null

                if (tab.type === "panel") {
                    return <div key={tab.id}>{tab.component}</div>
                }

                // Component tab: only render if alive.
                if (!tab.isAlive) return null

                const activeEntry = tab.history[tab.historyIndex]
                if (!activeEntry) return null

                return <div key={tab.id}>{activeEntry.component}</div>
            })}
        </>
    )
}
