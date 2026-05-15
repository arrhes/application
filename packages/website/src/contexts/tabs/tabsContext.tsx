import { createContext } from "react"
import type { OpenTabArgs } from "./tabDefinitions.js"

// ─── History ─────────────────────────────────────────────────────────────────

/**
 * One entry in a tab's back/forward history stack.
 * `component` is null when the entry has never been visited (or was evicted)
 * and will be (re)created from the registry on first access.
 */
export type HistoryEntry = {
    /** Stable random ID for this entry, used to build the browser URL. */
    id: string
    definitionKey: string
    definitionProps: Record<string, unknown>
    title: string
    description?: string
    /** The rendered React node. null = not yet mounted or evicted. */
    component: React.ReactNode
}

// ─── Tab Types ───────────────────────────────────────────────────────────────

export type ComponentTab = {
    id: string
    type: "component"
    /** All visited (and future-accessible) entries for this tab. */
    history: HistoryEntry[]
    /** Index into `history` that is currently visible. */
    historyIndex: number
    /**
     * Whether this tab's current history entry is mounted in the DOM.
     * When false all `entry.component` values are null (LRU-evicted).
     */
    isAlive: boolean
}

export type PanelTab = {
    id: string
    type: "panel"
    title: string
    description?: string
    icon?: string
    component: React.ReactNode // never serialized
}

export type Tab = ComponentTab | PanelTab

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns the currently-active history entry of a ComponentTab. */
export function currentEntry(tab: ComponentTab): HistoryEntry {
    return tab.history[tab.historyIndex]
}

// ─── Options ─────────────────────────────────────────────────────────────────

export type OpenTabOptions = {
    /**
     * When true, always create (or activate an existing) separate tab
     * instead of replacing the current tab's history.
     * Also forced when the user holds Ctrl / Meta during the click.
     */
    newTab?: boolean
}

// ─── Actions ─────────────────────────────────────────────────────────────────

export type TabsContextValue = {
    tabs: Tab[]
    activeTabId: string | null
    openTab: (args: OpenTabArgs, options?: OpenTabOptions) => void
    closeTab: (id: string) => void
    activateTab: (id: string) => void
    navigateBack: (tabId: string) => void
    navigateForward: (tabId: string) => void
    openPanelTab: (title: string, component: React.ReactNode, description?: string, icon?: string) => string
    updateTabTitle: (id: string, title: string) => void
    reorderTabs: (tabId: string, beforeTabId: string | null) => void
}

export const TabsContext = createContext<TabsContextValue | null>(null)
