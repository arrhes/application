import type { Tab } from "./tabsContext.js"

type TabContentAreaProps = {
    activeTabId: string | null
    tabs: Tab[]
}

export function TabContentArea({ activeTabId, tabs }: TabContentAreaProps) {
    const visibleStyle: React.CSSProperties = {
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
    }
    const hiddenStyle: React.CSSProperties = {
        display: "none",
    }

    return (
        <>
            {tabs.map((tab) => {
                const isActiveTab = tab.id === activeTabId

                if (tab.type === "panel") {
                    return (
                        <div
                            key={tab.id}
                            style={isActiveTab ? visibleStyle : hiddenStyle}
                        >
                            {tab.component}
                        </div>
                    )
                }

                // Component tab: only render if alive.
                if (!tab.isAlive) return null

                return (
                    <div
                        key={tab.id}
                        style={isActiveTab ? visibleStyle : hiddenStyle}
                    >
                        {tab.history.map((entry, idx) => (
                            <div
                                key={`${tab.id}-h${idx}`}
                                style={idx === tab.historyIndex ? visibleStyle : hiddenStyle}
                            >
                                {entry.component}
                            </div>
                        ))}
                    </div>
                )
            })}
        </>
    )
}
