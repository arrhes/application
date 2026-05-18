import { generateId } from "@arrhes/application-metadata"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { applicationRouter } from "../../routes/applicationRouter.js"
import { setCookie } from "../../utilities/cookies/setCookie.js"
import { cookiePrefix } from "../../utilities/variables.js"
import { type OpenTabArgs, TAB_REGISTRY, type TabDefinition } from "./tabDefinitions.js"
import {
    type ComponentTab,
    currentEntry,
    type HistoryEntry,
    type OpenTabOptions,
    type PanelTab,
    type Tab,
    TabsContext,
    type TabsContextValue,
} from "./tabsContext.js"
import { loadPersistedTabs, normalisePersisted, type PersistedHistoryEntry, savePersistedTabs } from "./tabsStorage.js"
import { OuterRouterProvider } from "./useOuterRouter.js"

// Maximum number of component tabs kept alive in React memory at any time.
const MAX_ALIVE_TABS = 5

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildEntry(definitionKey: string, definitionProps: Record<string, unknown>, id?: string): HistoryEntry {
    const registry = TAB_REGISTRY as Record<string, (p: unknown) => TabDefinition>
    const def = registry[definitionKey]?.(definitionProps)
    return {
        id: id ?? generateId(),
        definitionKey,
        definitionProps,
        title: def?.title ?? "",
        description: def?.description,
        component: def?.component ?? null,
    }
}

/**
 * Returns a new tabs array where at most MAX_ALIVE_TABS component tabs have
 * isAlive = true.  The `newlyActivatedId` is guaranteed to stay alive;
 * older tabs beyond the limit are evicted (isAlive = false, all history
 * component nodes cleared).
 */
function applyLruEviction(tabs: Tab[], newlyActivatedId: string): Tab[] {
    const aliveComponentTabs = tabs.filter((t): t is ComponentTab => t.type === "component" && t.isAlive)

    if (aliveComponentTabs.length <= MAX_ALIVE_TABS) return tabs

    const toEvict = aliveComponentTabs
        .filter((t) => t.id !== newlyActivatedId)
        .slice(0, aliveComponentTabs.length - MAX_ALIVE_TABS)

    const evictIds = new Set(toEvict.map((t) => t.id))

    return tabs.map((t) => {
        if (t.type === "component" && evictIds.has(t.id)) {
            return {
                ...t,
                isAlive: false,
                // Free all component nodes across history.
                history: t.history.map((e) => ({
                    ...e,
                    component: null,
                })),
            }
        }
        return t
    })
}

// ─── Provider ────────────────────────────────────────────────────────────────

type Props = {
    children: React.ReactNode
}

export function TabsProvider({ children }: Props) {
    const [tabs, setTabs] = useState<Tab[]>(() => {
        const raw = loadPersistedTabs()
        const persisted = raw ? normalisePersisted(raw) : null
        if (persisted && persisted.tabs.length > 0) {
            return persisted.tabs.flatMap((t) => {
                if (!t.history || t.history.length === 0) return []

                const history: HistoryEntry[] = t.history.map((e, idx) => {
                    // Only build the component for the currently-visible entry.
                    if (idx === (t.historyIndex ?? 0)) {
                        return buildEntry(e.definitionKey, e.definitionProps ?? {}, e.id)
                    }
                    return {
                        id: e.id,
                        definitionKey: e.definitionKey,
                        definitionProps: e.definitionProps ?? {},
                        title: e.title,
                        description: e.description,
                        component: null,
                    }
                })

                const tab: ComponentTab = {
                    id: t.id,
                    type: "component",
                    history,
                    historyIndex: t.historyIndex ?? 0,
                    isAlive: true,
                }
                return [
                    tab,
                ]
            })
        }
        return []
    })

    const [activeTabId, setActiveTabId] = useState<string | null>(() => {
        const persisted = loadPersistedTabs()
        if (persisted?.activeTabId) return persisted.activeTabId
        return null
    })

    // Ordered list of recently focused tab IDs (most recent last).
    // Used to determine which tab to activate after closing the active one.
    const focusHistoryRef = useRef<string[]>([])

    // Track whether Ctrl / Meta is currently held so openTab can decide
    // whether to replace-in-place or create a new tab — without requiring
    // every call site to pass a flag.
    const ctrlKeyRef = useRef(false)
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Control" || e.key === "Meta") ctrlKeyRef.current = true
        }
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Control" || e.key === "Meta") ctrlKeyRef.current = false
        }
        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)
        // Safety: reset if window loses focus.
        window.addEventListener("blur", () => {
            ctrlKeyRef.current = false
        })
        return () => {
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
        }
    }, [])

    // After every state change, sync to sessionStorage.
    useEffect(() => {
        const componentTabs = tabs.filter((t): t is ComponentTab => t.type === "component")
        savePersistedTabs({
            activeTabId,
            tabs: componentTabs.map((t) => ({
                id: t.id,
                type: "component" as const,
                history: t.history.map(
                    (e): PersistedHistoryEntry => ({
                        id: e.id,
                        definitionKey: e.definitionKey,
                        definitionProps: e.definitionProps,
                        title: e.title,
                        description: e.description,
                    }),
                ),
                historyIndex: t.historyIndex,
            })),
        })
    }, [
        tabs,
        activeTabId,
    ])

    // Keep a synchronous ref so openTab can read current tabs without a stale closure.
    const tabsRef = useRef<Tab[]>(tabs)
    tabsRef.current = tabs

    // Keep a synchronous ref for activeTabId too.
    const activeTabIdRef = useRef<string | null>(activeTabId)
    activeTabIdRef.current = activeTabId

    // Whenever the active tab or its current history entry changes, sync the
    // org cookie so that all API calls include the correct X-Organization-Id header.
    // This mirrors what organizationPathRoute.beforeLoad did in the TanStack Router flow.
    useEffect(() => {
        if (activeTabId === null) return
        const activeTab = tabs.find((t): t is ComponentTab => t.type === "component" && t.id === activeTabId)
        if (!activeTab) return
        const idOrganization = currentEntry(activeTab).definitionProps.idOrganization
        if (typeof idOrganization === "string" && idOrganization) {
            setCookie(`${cookiePrefix}_id_organization`, idOrganization)
        }
    }, [
        activeTabId,
        tabs,
    ])

    // On mount: initialise the browser URL from persisted state so the correct
    // /dashboard/:tabId/:historyIndex is shown immediately.
    useEffect(() => {
        if (activeTabId === null) {
            window.history.replaceState({}, "", "/dashboard")
        } else {
            const tab = tabsRef.current.find((t): t is ComponentTab => t.type === "component" && t.id === activeTabId)
            const entryId = tab ? currentEntry(tab).id : "0"
            window.history.replaceState(
                {
                    tabId: activeTabId,
                    entryId,
                },
                "",
                `/dashboard/${activeTabId}/${entryId}`,
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // React to browser back/forward (mouse buttons, keyboard, browser UI).
    // Parse the destination URL/state and update tab context accordingly.
    useEffect(() => {
        const onPopState = (e: PopStateEvent) => {
            const state = e.state as {
                tabId?: string
                entryId?: string
                panelTabId?: string
            } | null

            // Panel-tab back/forward: re-activate the panel if it still exists,
            // otherwise fall through to URL-based component-tab restoration.
            if (state?.panelTabId !== undefined) {
                const stillOpen = tabsRef.current.some((t) => t.id === state.panelTabId)
                if (stillOpen) {
                    setActiveTabId(state.panelTabId)
                    return
                }
                // Panel was closed — fall through to URL restoration below.
            }

            let tabId: string | null = null
            let entryId: string | null = null
            if (state?.tabId !== undefined && state.entryId !== undefined) {
                tabId = state.tabId
                entryId = state.entryId
            } else {
                const m = window.location.pathname.match(/^\/dashboard\/([^/]+)\/([^/]+)$/)
                if (m) {
                    tabId = m[1]
                    entryId = m[2]
                } else {
                    const s = window.location.pathname.match(/^\/dashboard\/([^/]+)$/)
                    if (s) tabId = s[1]
                }
            }
            if (tabId === null) return
            setActiveTabId(tabId)
            setTabs((prev) =>
                applyLruEviction(
                    prev.map((t) => {
                        if (t.type !== "component" || t.id !== tabId) return t
                        const historyIndex = entryId ? t.history.findIndex((e) => e.id === entryId) : t.historyIndex
                        if (historyIndex < 0) return t
                        const history = t.history.map((e, i) => {
                            if (i !== historyIndex || e.component !== null) return e
                            return buildEntry(e.definitionKey, e.definitionProps, e.id)
                        })
                        return {
                            ...t,
                            history,
                            historyIndex,
                        }
                    }),
                    tabId,
                ),
            )
        }
        window.addEventListener("popstate", onPopState)
        return () => window.removeEventListener("popstate", onPopState)
    }, [])

    // ─── Actions ─────────────────────────────────────────────────────────────

    const openTab = useCallback((args: OpenTabArgs, options?: OpenTabOptions) => {
        window.dispatchEvent(new CustomEvent("arrhes:tab-opened"))

        const forceNew = options?.newTab === true || ctrlKeyRef.current

        const registry = TAB_REGISTRY as Record<string, (p: unknown) => TabDefinition>
        const def = registry[args.component as string]?.(args.props as Record<string, unknown>)
        if (!def) return

        const definitionKey = args.component as string
        const definitionProps = args.props as Record<string, unknown>

        const current = tabsRef.current
        const currentActiveId = activeTabIdRef.current

        if (!forceNew) {
            // ── Replace mode: push into the current tab's history ───────────
            const activeTab = current.find((t): t is ComponentTab => t.type === "component" && t.id === currentActiveId)

            if (activeTab) {
                // Check if the current history entry is already this exact definition
                const ce = currentEntry(activeTab)
                if (
                    ce.definitionKey === definitionKey &&
                    JSON.stringify(ce.definitionProps) === JSON.stringify(definitionProps)
                ) {
                    // Already showing this — no-op.
                    return
                }

                const entry = buildEntry(definitionKey, definitionProps)
                const newHistory = [
                    // Truncate any forward history.
                    ...activeTab.history.slice(0, activeTab.historyIndex + 1),
                    entry,
                ]
                const newIndex = newHistory.length - 1

                setTabs((prev) =>
                    applyLruEviction(
                        prev.map((t) =>
                            t.id === activeTab.id
                                ? {
                                      ...t,
                                      history: newHistory,
                                      historyIndex: newIndex,
                                  }
                                : t,
                        ),
                        activeTab.id,
                    ),
                )
                window.history.pushState(
                    {
                        tabId: activeTab.id,
                        entryId: entry.id,
                    },
                    "",
                    `/dashboard/${activeTab.id}/${entry.id}`,
                )
                // Active tab ID stays the same.
                return
            }
            // No active tab — fall through to create a new one.
        }

        // ── New tab mode ─────────────────────────────────────────────────────
        // Dedup: find a tab whose current history entry matches.
        const existing = current.find((t): t is ComponentTab => {
            if (t.type !== "component") return false
            const ce = currentEntry(t)
            return (
                ce.definitionKey === definitionKey &&
                JSON.stringify(ce.definitionProps) === JSON.stringify(definitionProps)
            )
        })

        if (existing) {
            // Revive if evicted.
            setTabs((prev) =>
                applyLruEviction(
                    prev.map((t) => {
                        if (t.type === "component" && t.id === existing.id && !t.isAlive) {
                            const history = t.history.map((e, i) =>
                                i === t.historyIndex ? buildEntry(e.definitionKey, e.definitionProps) : e,
                            )
                            return {
                                ...t,
                                isAlive: true,
                                history,
                            }
                        }
                        return t
                    }),
                    existing.id,
                ),
            )
            setActiveTabId(existing.id)
            // Push so the previous tab's position is preserved in browser history.
            if (currentActiveId !== existing.id) {
                window.history.pushState(
                    {
                        tabId: existing.id,
                        entryId: currentEntry(existing).id,
                    },
                    "",
                    `/dashboard/${existing.id}/${currentEntry(existing).id}`,
                )
            } else {
                window.history.replaceState(
                    {
                        tabId: existing.id,
                        entryId: currentEntry(existing).id,
                    },
                    "",
                    `/dashboard/${existing.id}/${currentEntry(existing).id}`,
                )
            }
            return
        }

        const entry = buildEntry(definitionKey, definitionProps)
        const newTab: ComponentTab = {
            id: generateId(),
            type: "component",
            history: [
                entry,
            ],
            historyIndex: 0,
            isAlive: true,
        }
        setActiveTabId(newTab.id)
        setTabs((prev) =>
            applyLruEviction(
                [
                    ...prev,
                    newTab,
                ],
                newTab.id,
            ),
        )
        // Push so the previous tab's position is preserved in browser history.
        if (currentActiveId !== null) {
            window.history.pushState(
                {
                    tabId: newTab.id,
                    entryId: entry.id,
                },
                "",
                `/dashboard/${newTab.id}/${entry.id}`,
            )
        } else {
            window.history.replaceState(
                {
                    tabId: newTab.id,
                    entryId: entry.id,
                },
                "",
                `/dashboard/${newTab.id}/${entry.id}`,
            )
        }
    }, [])

    const closeTab = useCallback((id: string) => {
        const current = tabsRef.current
        const idx = current.findIndex((t) => t.id === id)
        if (idx === -1) return
        const next = current.filter((t) => t.id !== id)
        const currentActiveId = activeTabIdRef.current

        // Remove closed tab from focus history.
        focusHistoryRef.current = focusHistoryRef.current.filter((fid) => fid !== id)

        let newActiveId: string | null
        if (next.length === 0) {
            newActiveId = null
        } else if (currentActiveId !== id) {
            newActiveId = currentActiveId
        } else {
            // Find the most recently focused tab that still exists.
            const existingIds = new Set(next.map((t) => t.id))
            const lastFocused = [
                ...focusHistoryRef.current,
            ]
                .reverse()
                .find((fid) => existingIds.has(fid))
            newActiveId = lastFocused ?? next[Math.min(idx, next.length - 1)].id
        }

        setTabs((prev) => {
            const i = prev.findIndex((t) => t.id === id)
            if (i === -1) return prev
            const n = prev.filter((t) => t.id !== id)
            if (n.length === 0) {
                setActiveTabId(null)
                return []
            }
            setActiveTabId((currentActive) => {
                if (currentActive !== id) return currentActive
                const existingIds = new Set(n.map((t) => t.id))
                const lastFocused = [
                    ...focusHistoryRef.current,
                ]
                    .reverse()
                    .find((fid) => existingIds.has(fid))
                return lastFocused ?? n[Math.min(i, n.length - 1)].id
            })
            return n
        })

        if (newActiveId === null) {
            window.history.replaceState({}, "", "/dashboard")
        } else {
            const newActiveTab = next.find((t): t is ComponentTab => t.type === "component" && t.id === newActiveId)
            const entryId = newActiveTab ? currentEntry(newActiveTab).id : "0"
            window.history.replaceState(
                {
                    tabId: newActiveId,
                    entryId,
                },
                "",
                `/dashboard/${newActiveId}/${entryId}`,
            )
        }
    }, [])

    const activateTab = useCallback((id: string) => {
        // Record in focus history (append, deduplicate from earlier positions).
        focusHistoryRef.current = [
            ...focusHistoryRef.current.filter((fid) => fid !== id),
            id,
        ]

        setTabs((prev) => {
            const revived = prev.map((t) => {
                if (t.type === "component" && t.id === id && !t.isAlive) {
                    const history = t.history.map((e, i) =>
                        i === t.historyIndex ? buildEntry(e.definitionKey, e.definitionProps) : e,
                    )
                    return {
                        ...t,
                        isAlive: true,
                        history,
                    }
                }
                return t
            })
            return applyLruEviction(revived, id)
        })
        setActiveTabId(id)
        const tab = tabsRef.current.find((t): t is ComponentTab => t.type === "component" && t.id === id)
        const entryId = tab ? currentEntry(tab).id : "0"
        // Push a new browser history entry when switching to a different tab so
        // the back button returns to the previous tab at its exact position.
        // Replace (no-op) when re-activating the already-active tab.
        if (activeTabIdRef.current !== id) {
            window.history.pushState(
                {
                    tabId: id,
                    entryId,
                },
                "",
                `/dashboard/${id}/${entryId}`,
            )
        } else {
            window.history.replaceState(
                {
                    tabId: id,
                    entryId,
                },
                "",
                `/dashboard/${id}/${entryId}`,
            )
        }
    }, [])

    // Navigate within the tab's own history stack (does not add browser history entries).
    const navigateBack = useCallback((tabId: string) => {
        const tab = tabsRef.current.find((t): t is ComponentTab => t.type === "component" && t.id === tabId)
        if (!tab || tab.historyIndex <= 0) return
        const newIndex = tab.historyIndex - 1
        const targetEntry = tab.history[newIndex]
        setTabs((prev) => {
            const t = prev.find((pt): pt is ComponentTab => pt.type === "component" && pt.id === tabId)
            if (!t || t.historyIndex <= 0) return prev
            const idx = t.historyIndex - 1
            const history = t.history.map((e, i) => {
                if (i !== idx || e.component !== null) return e
                return buildEntry(e.definitionKey, e.definitionProps, e.id)
            })
            return applyLruEviction(
                prev.map((pt) =>
                    pt.id === tabId
                        ? {
                              ...t,
                              history,
                              historyIndex: idx,
                          }
                        : pt,
                ),
                tabId,
            )
        })
        window.history.replaceState(
            {
                tabId,
                entryId: targetEntry.id,
            },
            "",
            `/dashboard/${tabId}/${targetEntry.id}`,
        )
    }, [])

    const navigateForward = useCallback((tabId: string) => {
        const tab = tabsRef.current.find((t): t is ComponentTab => t.type === "component" && t.id === tabId)
        if (!tab || tab.historyIndex >= tab.history.length - 1) return
        const newIndex = tab.historyIndex + 1
        const targetEntry = tab.history[newIndex]
        setTabs((prev) => {
            const t = prev.find((pt): pt is ComponentTab => pt.type === "component" && pt.id === tabId)
            if (!t || t.historyIndex >= t.history.length - 1) return prev
            const idx = t.historyIndex + 1
            const history = t.history.map((e, i) => {
                if (i !== idx || e.component !== null) return e
                return buildEntry(e.definitionKey, e.definitionProps, e.id)
            })
            return applyLruEviction(
                prev.map((pt) =>
                    pt.id === tabId
                        ? {
                              ...t,
                              history,
                              historyIndex: idx,
                          }
                        : pt,
                ),
                tabId,
            )
        })
        window.history.replaceState(
            {
                tabId,
                entryId: targetEntry.id,
            },
            "",
            `/dashboard/${tabId}/${targetEntry.id}`,
        )
    }, [])

    const openPanelTab = useCallback(
        (title: string, component: React.ReactNode, description?: string, icon?: string): string => {
            // Dedup: if a panel tab with the same title already exists, focus it.
            const existing = tabsRef.current.find((t): t is PanelTab => t.type === "panel" && t.title === title)
            if (existing) {
                setActiveTabId(existing.id)
                window.history.pushState(
                    {
                        panelTabId: existing.id,
                    },
                    "",
                    window.location.href,
                )
                return existing.id
            }

            const id = generateId()
            const newTab: PanelTab = {
                id,
                type: "panel",
                title,
                description,
                icon,
                component,
            }
            setTabs((prev) => [
                ...prev,
                newTab,
            ])
            setActiveTabId(id)
            // Push a browser history entry so that pressing Back from a panel tab
            // returns to the previous tab/panel rather than skipping it.
            // Store the panel tab ID so popstate can re-activate it on forward.
            window.history.pushState(
                {
                    panelTabId: id,
                },
                "",
                window.location.href,
            )
            return id
        },
        [],
    )

    const updateTabTitle = useCallback((id: string, title: string) => {
        setTabs((prev) =>
            prev.map((t) => {
                if (t.id !== id || t.type !== "component") return t
                // Update the title of the current history entry.
                const history = t.history.map((e, i) =>
                    i === t.historyIndex
                        ? {
                              ...e,
                              title,
                          }
                        : e,
                )
                return {
                    ...t,
                    history,
                }
            }),
        )
    }, [])

    const reorderTabs = useCallback((tabId: string, beforeTabId: string | null) => {
        setTabs((prev) => {
            const tab = prev.find((t) => t.id === tabId)
            if (!tab) return prev
            const without = prev.filter((t) => t.id !== tabId)
            if (beforeTabId === null)
                return [
                    ...without,
                    tab,
                ]
            const idx = without.findIndex((t) => t.id === beforeTabId)
            if (idx === -1)
                return [
                    ...without,
                    tab,
                ]
            return [
                ...without.slice(0, idx),
                tab,
                ...without.slice(idx),
            ]
        })
    }, [])

    const value = useMemo<TabsContextValue>(
        () => ({
            tabs,
            activeTabId,
            openTab,
            closeTab,
            activateTab,
            navigateBack,
            navigateForward,
            openPanelTab,
            updateTabTitle,
            reorderTabs,
        }),
        [
            tabs,
            activeTabId,
            openTab,
            closeTab,
            activateTab,
            navigateBack,
            navigateForward,
            openPanelTab,
            updateTabTitle,
            reorderTabs,
        ],
    )

    return (
        <OuterRouterProvider value={applicationRouter}>
            <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
        </OuterRouterProvider>
    )
}
