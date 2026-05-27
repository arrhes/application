import { readUserSessionRouteDefinition, signOutRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonGhostContent, ButtonOutlineContent, Logo, Separator, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import {
    IconBook2,
    IconChevronRight,
    IconLifebuoy,
    IconLogout,
    IconSearch,
    IconSettings,
    IconShield,
    IconTicket,
    IconUser,
} from "@tabler/icons-react"
import { Outlet } from "@tanstack/react-router"
import { useCallback, useEffect, useRef, useState } from "react"
import { CommandPalette } from "../../../components/layouts/commandPalette/CommandPalette.js"
import { TabBar } from "../../../components/layouts/tabBar/TabBar.js"
import { Popover } from "../../../components/overlays/popover/popover.js"
import { useDashboardContext } from "../../../contexts/dashboard/dashboardContext.js"
import { TabContentArea } from "../../../contexts/tabs/TabContentArea.js"
import { type ComponentTab, currentEntry } from "../../../contexts/tabs/tabsContext.js"
import { useOuterRouter } from "../../../contexts/tabs/useOuterRouter.js"
import { useTabs } from "../../../contexts/tabs/useTabs.js"
import { deleteCookies } from "../../../utilities/cookies/deleteCookies.js"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.js"
import { useDataFromAPI } from "../../../utilities/useHTTPData.js"
import { OrganizationContextSelect } from "../OrganizationContextSelect.js"
import { YearContextSelect } from "../YearContextSelect.js"

// ─── Inner shell — rendered inside TabsProvider ──────────────────────────────

export function DashboardShell() {
    const { tabs, activeTabId, activateTab, openTab, reorderTabs, closeTab } = useTabs()
    const applicationRouter = useOuterRouter()
    const { selectedOrgId, selectedYearId, setOrg, setYear } = useDashboardContext()
    const [splitPosition, setSplitPosition] = useState(50)
    const containerRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)
    const dragStartX = useRef(0)
    const dragStartPosition = useRef(50)

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging.current || !containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const deltaX = e.clientX - dragStartX.current
        const deltaPct = (deltaX / rect.width) * 100
        const newPct = Math.min(80, Math.max(20, dragStartPosition.current + deltaPct))
        setSplitPosition(newPct)
    }, [])

    const handleMouseUp = useCallback(() => {
        isDragging.current = false
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
    }, [
        handleMouseMove,
    ])

    const handleDragStart = useCallback(
        (e: React.MouseEvent) => {
            isDragging.current = true
            dragStartX.current = e.clientX
            dragStartPosition.current = splitPosition
            document.body.style.cursor = "col-resize"
            document.body.style.userSelect = "none"
            window.addEventListener("mousemove", handleMouseMove)
            window.addEventListener("mouseup", handleMouseUp)
        },
        [
            splitPosition,
            handleMouseMove,
            handleMouseUp,
        ],
    )

    useEffect(
        () => () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        },
        [
            handleMouseMove,
            handleMouseUp,
        ],
    )

    const [rightPanel, setRightPanel] = useState<{
        tabIds: string[]
        activeTabId: string
    } | null>(null)

    // Listen for split-tab events dispatched from the tab bar context menu.
    const handleSplitTab = useCallback(
        (e: Event) => {
            const tabId = (
                e as CustomEvent<{
                    tabId: string
                }>
            ).detail.tabId
            setRightPanel((prev) => {
                if (!prev)
                    return {
                        tabIds: [
                            tabId,
                        ],
                        activeTabId: tabId,
                    }
                if (prev.tabIds.includes(tabId))
                    return {
                        ...prev,
                        activeTabId: tabId,
                    }
                return {
                    tabIds: [
                        ...prev.tabIds,
                        tabId,
                    ],
                    activeTabId: tabId,
                }
            })
            // If the tab was active in the left panel, switch to another left-panel tab.
            if (tabId === activeTabId) {
                const rightIds = new Set(rightPanel?.tabIds ?? [])
                rightIds.add(tabId)
                const remaining = tabs.filter((t) => !rightIds.has(t.id))
                if (remaining.length > 0) activateTab(remaining[remaining.length - 1].id)
            }
        },
        [
            activeTabId,
            tabs,
            rightPanel,
            activateTab,
        ],
    )

    useEffect(() => {
        window.addEventListener("arrhes:split-tab", handleSplitTab)
        return () => window.removeEventListener("arrhes:split-tab", handleSplitTab)
    }, [
        handleSplitTab,
    ])

    // Remove closed tabs from right panel.
    useEffect(() => {
        if (!rightPanel) return
        const existingIds = new Set(tabs.map((t) => t.id))
        const filtered = rightPanel.tabIds.filter((id) => existingIds.has(id))
        if (filtered.length === rightPanel.tabIds.length) return
        if (filtered.length === 0) {
            setRightPanel(null)
        } else {
            const newActive = filtered.includes(rightPanel.activeTabId)
                ? rightPanel.activeTabId
                : filtered[filtered.length - 1]
            setRightPanel({
                tabIds: filtered,
                activeTabId: newActive,
            })
        }
    }, [
        tabs,
        rightPanel,
    ])

    // Auto-close split view when the left panel would have no tabs.
    useEffect(() => {
        if (!rightPanel) return
        const rightSet = new Set(rightPanel.tabIds)
        if (tabs.filter((t) => !rightSet.has(t.id)).length === 0) {
            setRightPanel(null)
        }
    }, [
        tabs,
        rightPanel,
    ])

    // Update browser title when active tab changes.
    useEffect(() => {
        const activeTab = tabs.find((t) => t.id === activeTabId)
        if (activeTab) {
            const title =
                activeTab.type === "component" ? currentEntry(activeTab as ComponentTab).title : activeTab.title
            document.title = `${title} — Arrhes`
            // Update meta description.
            const meta = document.querySelector<HTMLMetaElement>("meta[name='description']")
            if (meta && activeTab.type === "component") {
                const entry = currentEntry(activeTab as ComponentTab)
                if (entry.description) meta.content = entry.description
            }
        } else {
            document.title = "Arrhes"
        }
    }, [
        tabs,
        activeTabId,
    ])

    function handleOrgChange(id: string | null) {
        setOrg(id)
    }

    function handleYearChange(id: string | null) {
        setYear(id)
    }

    const userSession = useDataFromAPI({
        routeDefinition: readUserSessionRouteDefinition,
        body: {},
    })

    return (
        <div
            className={css({
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                backgroundColor: "background",
                overflow: "hidden",
            })}
        >
            {/* Header */}
            <header
                className={css({
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1rem",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/10",
                    backgroundColor: "white",
                    flexShrink: 0,
                })}
            >
                {/* Breadcrumb: Logo / Org / Year */}
                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexShrink: 0,
                    })}
                >
                    <ButtonGhostContent
                        leftIcon={<Logo />}
                        text="Arrhes"
                        className={css({
                            _hover: {
                                backgroundColor: "transparent"
                            }
                        })}
                    />
                    <IconChevronRight
                        size={16}
                        className={css({
                            stroke: "neutral/20",
                            display: {
                                base: "none",
                                sm: "block",
                            },
                        })}
                    />
                    <OrganizationContextSelect
                        value={selectedOrgId}
                        onChange={handleOrgChange}
                    />
                    {selectedOrgId !== null && (
                        <>
                            <IconChevronRight
                                size={16}
                                className={css({
                                    stroke: "neutral/20",
                                    display: {
                                        base: "none",
                                        sm: "block",
                                    },
                                })}
                            />
                            <YearContextSelect
                                value={selectedYearId}
                                onChange={handleYearChange}
                                idOrganizationSelected={selectedOrgId}
                            />
                        </>
                    )}
                </div>

                {/* Search */}
                <Button
                    onClick={() => window.dispatchEvent(new CustomEvent("arrhes:open-palette"))}
                    title="Rechercher (Ctrl+K)"
                    className={css({
                        marginRight: "auto",
                    })}
                >
                    <ButtonOutlineContent
                        leftIcon={<IconSearch size={16} />}
                        text="Rechercher…"
                        className={css({
                            width: "300px",
                            justifyContent: "start",
                        })}
                    />
                </Button>

                {/* Right: nav actions */}
                <nav
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexShrink: 0,
                    })}
                >
                    <Button
                        onClick={() => window.open("/documentation", "_blank", "noopener,noreferrer")}
                        title="Documentation"
                    >
                        <ButtonGhostContent leftIcon={<IconBook2 />} />
                    </Button>
                    {userSession.data?.user.isSuperAdmin === true && (
                        <Popover.Root>
                            <Popover.Trigger asChild>
                                <Button title="Administration">
                                    <ButtonOutlineContent leftIcon={<IconShield />} />
                                </Button>
                            </Popover.Trigger>
                            <Popover.Content
                                align="end"
                                className={css({
                                    padding: "0.5rem",
                                    gap: "0.25rem",
                                })}
                            >
                                <Button
                                    onClick={() =>
                                        openTab(
                                            {
                                                component: "admin-tickets",
                                                props: {},
                                            },
                                            {
                                                newTab: true,
                                            },
                                        )
                                    }
                                    className={css({
                                        width: "100%",
                                    })}
                                >
                                    <ButtonGhostContent
                                        leftIcon={<IconTicket />}
                                        text="Tickets"
                                        className={css({
                                            width: "100%",
                                            justifyContent: "start",
                                        })}
                                    />
                                </Button>
                            </Popover.Content>
                        </Popover.Root>
                    )}
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <Button title="Utilisateur">
                                <ButtonOutlineContent leftIcon={<IconUser />} />
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content
                            align="end"
                            className={css({
                                padding: "0.5rem",
                                gap: "0.25rem",
                            })}
                        >
                            <Button
                                onClick={() =>
                                    openTab(
                                        {
                                            component: "profil",
                                            props: {},
                                        },
                                        {
                                            newTab: true,
                                        },
                                    )
                                }
                                className={css({
                                    width: "100%",
                                })}
                            >
                                <ButtonGhostContent
                                    leftIcon={<IconSettings />}
                                    text="Profil"
                                    className={css({
                                        width: "100%",
                                        justifyContent: "start",
                                    })}
                                />
                            </Button>
                            <Button
                                onClick={() =>
                                    openTab(
                                        {
                                            component: "support",
                                            props: {},
                                        },
                                        {
                                            newTab: true,
                                        },
                                    )
                                }
                                className={css({
                                    width: "100%",
                                })}
                            >
                                <ButtonGhostContent
                                    leftIcon={<IconLifebuoy />}
                                    text="Support"
                                    className={css({
                                        width: "100%",
                                        justifyContent: "start",
                                    })}
                                />
                            </Button>
                            <Separator />
                            <Button
                                className={css({
                                    width: "100%",
                                })}
                                onClick={async () => {
                                    try {
                                        await getResponseBodyFromAPI({
                                            routeDefinition: signOutRouteDefinition,
                                            body: {},
                                        })
                                    } catch {
                                        // If the API is unreachable, still log out client-side.
                                    }

                                    deleteCookies()
                                    toast({
                                        title: "Déconnexion réussie",
                                        variant: "success",
                                    })

                                    applicationRouter.navigate({
                                        to: "/connexion",
                                        reloadDocument: true,
                                    })
                                }}
                            >
                                <ButtonGhostContent
                                    leftIcon={<IconLogout />}
                                    text="Se déconnecter"
                                    color="danger"
                                    className={css({
                                        width: "100%",
                                        justifyContent: "start",
                                    })}
                                />
                            </Button>
                        </Popover.Content>
                    </Popover.Root>
                </nav>
            </header>

            {/* Tab bar + content area — panels side by side when split */}
            <div
                ref={containerRef}
                className={css({
                    width: "100%",
                    flex: "1",
                    display: "flex",
                    flexDirection: "row",
                    minHeight: 0,
                    overflow: "hidden",
                    backgroundColor: "white",
                })}
            >
                {/* Main / left panel — has its own tab bar */}
                <div
                    style={{
                        flex: rightPanel ? `0 0 ${splitPosition}%` : "1 1 0%",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 0,
                        overflow: "hidden",
                    }}
                >
                    <TabBar
                        excludeTabIds={rightPanel?.tabIds ?? []}
                        onMergePanels={rightPanel ? () => setRightPanel(null) : undefined}
                        onDropFromRight={(tabId, insertBeforeTabId) => {
                            setRightPanel((prev) => {
                                if (!prev) return null
                                const next = prev.tabIds.filter((id) => id !== tabId)
                                return next.length === 0
                                    ? null
                                    : {
                                        tabIds: next,
                                        activeTabId: next.includes(prev.activeTabId)
                                            ? prev.activeTabId
                                            : next[next.length - 1],
                                    }
                            })
                            reorderTabs(tabId, insertBeforeTabId)
                            activateTab(tabId)
                        }}
                    />
                    <Outlet />
                    <TabContentArea
                        activeTabId={activeTabId}
                        tabs={tabs.filter((t) => !rightPanel?.tabIds.includes(t.id))}
                    />
                </div>

                {/* Split / right panel */}
                {rightPanel && (
                    <>
                        {/* Drag handle */}
                        <div
                            className={css({
                                flexShrink: 0,
                                width: "4px",
                                cursor: "col-resize",
                                background: "neutral/10",
                                transition: "background 0.15s",
                                _hover: {
                                    background: "neutral/30",
                                },
                                _active: {
                                    background: "neutral/50",
                                },
                            })}
                            onMouseDown={handleDragStart}
                        />
                        {/* Right panel */}
                        <div
                            style={{
                                flex: "1 1 0%",
                                display: "flex",
                                flexDirection: "column",
                                minHeight: 0,
                                overflow: "hidden",
                            }}
                        >
                            <TabBar
                                onMergePanels={() => setRightPanel(null)}
                                panel={{
                                    tabIds: rightPanel.tabIds,
                                    activeTabId: rightPanel.activeTabId,
                                    onActivate: (tabId) =>
                                        setRightPanel(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    activeTabId: tabId,
                                                },
                                        ),
                                    onRemove: (tabId) => {
                                        setRightPanel((prev) => {
                                            if (!prev) return null
                                            const next = prev.tabIds.filter((id) => id !== tabId)
                                            if (next.length === 0) {
                                                closeTab(tabId)
                                                return null
                                            }
                                            const newActive =
                                                prev.activeTabId === tabId ? next[next.length - 1] : prev.activeTabId
                                            return {
                                                tabIds: next,
                                                activeTabId: newActive,
                                            }
                                        })
                                    },
                                    onReorder: (tabId, insertBeforeTabId) =>
                                        setRightPanel((prev) => {
                                            if (!prev) return null
                                            const without = prev.tabIds.filter((id) => id !== tabId)
                                            if (insertBeforeTabId === null)
                                                return {
                                                    ...prev,
                                                    tabIds: [
                                                        ...without,
                                                        tabId,
                                                    ],
                                                }
                                            const idx = without.indexOf(insertBeforeTabId)
                                            const tabIds =
                                                idx === -1
                                                    ? [
                                                        ...without,
                                                        tabId,
                                                    ]
                                                    : [
                                                        ...without.slice(0, idx),
                                                        tabId,
                                                        ...without.slice(idx),
                                                    ]
                                            return {
                                                ...prev,
                                                tabIds,
                                            }
                                        }),
                                    onDropFromLeft: (tabId, insertBeforeTabId) =>
                                        setRightPanel((prev) => {
                                            const existing = prev?.tabIds.filter((id) => id !== tabId) ?? []
                                            if (insertBeforeTabId === null)
                                                return {
                                                    tabIds: [
                                                        ...existing,
                                                        tabId,
                                                    ],
                                                    activeTabId: tabId,
                                                }
                                            const idx = existing.indexOf(insertBeforeTabId)
                                            const tabIds =
                                                idx === -1
                                                    ? [
                                                        ...existing,
                                                        tabId,
                                                    ]
                                                    : [
                                                        ...existing.slice(0, idx),
                                                        tabId,
                                                        ...existing.slice(idx),
                                                    ]
                                            return {
                                                tabIds,
                                                activeTabId: tabId,
                                            }
                                        }),
                                }}
                            />
                            <TabContentArea
                                activeTabId={rightPanel.activeTabId}
                                tabs={tabs.filter((t) => rightPanel.tabIds.includes(t.id))}
                            />
                        </div>
                    </>
                )}
            </div>

            {/* Command palette / search */}
            <CommandPalette
                selectedOrgId={selectedOrgId}
                selectedYearId={selectedYearId}
            />
        </div>
    )
}
