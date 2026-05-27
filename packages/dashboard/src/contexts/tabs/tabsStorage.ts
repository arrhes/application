import { generateId } from "@arrhes/application-metadata"

// ─── sessionStorage persistence ──────────────────────────────────────────────
// Only component tabs are persisted (panel tabs hold a ReactNode which can't be serialized).

const STORAGE_KEY = "arrhes_tabs"

export type PersistedHistoryEntry = {
    id: string
    definitionKey: string
    definitionProps: Record<string, unknown>
    title: string
    description?: string
}

export type PersistedComponentTab = {
    id: string
    type: "component"
    /** Full navigation history for this tab. */
    history: PersistedHistoryEntry[]
    /** Currently-visible index into `history`. */
    historyIndex: number
}

export type PersistedState = {
    activeTabId: string | null
    tabs: PersistedComponentTab[]
}

// ─── Legacy shape (before history was introduced) ────────────────────────────

type LegacyPersistedTab = {
    id: string
    type: "component"
    title: string
    description?: string
    icon?: string
    definitionKey: string
    definitionProps: Record<string, unknown>
    // no `history` field
}

type LegacyPersistedState = {
    activeTabId: string | null
    tabs: LegacyPersistedTab[]
}

function isLegacy(raw: unknown): raw is LegacyPersistedState {
    if (typeof raw !== "object" || raw === null) return false
    const obj = raw as Record<string, unknown>
    if (!Array.isArray(obj.tabs)) return false
    const first = obj.tabs[0]
    if (!first) return true // empty — either format
    return !("history" in first)
}

// ─── I/O ─────────────────────────────────────────────────────────────────────

export function loadPersistedTabs(): PersistedState | null {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY)
        if (raw === null) return null
        const parsed: unknown = JSON.parse(raw)

        // Migrate legacy format that had a flat definitionKey/definitionProps/title.
        if (isLegacy(parsed)) {
            return {
                activeTabId: parsed.activeTabId,
                tabs: parsed.tabs.map((t) => ({
                    id: t.id,
                    type: "component" as const,
                    history: [
                        {
                            id: generateId(),
                            definitionKey: t.definitionKey,
                            definitionProps: t.definitionProps ?? {},
                            title: t.title,
                            description: t.description,
                        },
                    ],
                    historyIndex: 0,
                })),
            }
        }

        return parsed as PersistedState
    } catch {
        return null
    }
}

/** Normalise a loaded state: assign IDs to any entries that are missing one
 * (forward-compat for sessions saved before this field was added). */
export function normalisePersisted(state: PersistedState): PersistedState {
    return {
        ...state,
        tabs: state.tabs.map((t) => ({
            ...t,
            history: t.history.map((e) =>
                e.id
                    ? e
                    : {
                          ...e,
                          id: generateId(),
                      },
            ),
        })),
    }
}

export function savePersistedTabs(state: PersistedState): void {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
        // sessionStorage unavailable (private mode etc.) — silently ignore
    }
}
