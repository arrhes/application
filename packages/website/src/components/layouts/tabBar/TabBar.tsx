import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconChevronRight, IconLayoutColumns, IconPlus, IconX } from "@tabler/icons-react"
import { type ReactNode, useState } from "react"
import { type ComponentTab, currentEntry } from "../../../contexts/tabs/tabsContext.js"
import { useTabs } from "../../../contexts/tabs/useTabs.js"
import { ContextMenu } from "../../overlays/contextMenu/contextMenu.js"

type RightPanelProps = {
    tabIds: string[]
    activeTabId: string
    onActivate: (tabId: string) => void
    onRemove: (tabId: string) => void
    onReorder: (tabId: string, insertBeforeTabId: string | null) => void
    onDropFromLeft: (tabId: string, insertBeforeTabId: string | null) => void
}

type TabBarProps = {
    excludeTabIds?: string[]
    rightSlot?: ReactNode
    onDropFromRight?: (tabId: string, insertBeforeTabId: string | null) => void
    onMergePanels?: () => void
    /** When provided, puts the bar in right-panel mode. */
    panel?: RightPanelProps
}

export function TabBar({ excludeTabIds, rightSlot, onDropFromRight, onMergePanels, panel }: TabBarProps = {}) {
    const { tabs: allTabs, activeTabId: contextActiveTabId, activateTab, closeTab, navigateBack, navigateForward, reorderTabs } = useTabs()

    const isRightPanel = panel !== undefined
    const dragDataType = isRightPanel ? "application/arrhes-right-tab" : "application/arrhes-left-tab"
    const crossDragDataType = isRightPanel ? "application/arrhes-left-tab" : "application/arrhes-right-tab"

    const tabs = isRightPanel
        ? panel.tabIds.flatMap((id) => { const t = allTabs.find((x) => x.id === id); return t ? [t] : [] })
        : allTabs.filter((t) => !excludeTabIds?.includes(t.id))

    const activeTabId = isRightPanel ? panel.activeTabId : contextActiveTabId

    function onActivateTab(tabId: string) {
        if (isRightPanel) panel.onActivate(tabId)
        else activateTab(tabId)
    }

    function onCloseTab(tabId: string) {
        if (isRightPanel) panel.onRemove(tabId)
        else closeTab(tabId)
    }

    function onReorderTab(tabId: string, insertBeforeTabId: string | null) {
        if (isRightPanel) panel.onReorder(tabId, insertBeforeTabId)
        else reorderTabs(tabId, insertBeforeTabId)
    }

    function onCrossDropTab(tabId: string, insertBeforeTabId: string | null) {
        if (isRightPanel) panel.onDropFromLeft(tabId, insertBeforeTabId)
        else onDropFromRight?.(tabId, insertBeforeTabId)
    }

    const [dragOverTabId, setDragOverTabId] = useState<string | null>(null)
    const [contextMenuTabId, setContextMenuTabId] = useState<string | null>(null)
    const contextTab = contextMenuTabId !== null ? (tabs.find((t) => t.id === contextMenuTabId) ?? null) : null
    const contextTabCanGoBack =
        contextTab?.type === "component" && (contextTab as ComponentTab).historyIndex > 0
    const contextTabCanGoForward =
        contextTab?.type === "component" &&
        (contextTab as ComponentTab).historyIndex < (contextTab as ComponentTab).history.length - 1

    return (
        <ContextMenu.Root onOpenChange={(open) => { if (!open) setContextMenuTabId(null) }}>
            <ContextMenu.Trigger asChild>
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "stretch",
                        backgroundColor: "white",
                        borderBottom: "1px solid",
                        borderBottomColor: "neutral/10",
                        flexShrink: 0,
                        overflowX: "auto",
                        overflowY: "hidden",
                        // Hide scrollbar visually but keep scrollability
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    })}
                    role="tablist"
                    onContextMenuCapture={() => setContextMenuTabId(null)}
                    onDragOver={(e) => {
                        if (
                            e.dataTransfer.types.includes("application/arrhes-left-tab") ||
                            e.dataTransfer.types.includes("application/arrhes-right-tab")
                        )
                            e.preventDefault()
                    }}
                    onDrop={(e) => {
                        const fromSamePanel = e.dataTransfer.types.includes(dragDataType)
                        const draggedTabId = fromSamePanel
                            ? e.dataTransfer.getData(dragDataType)
                            : e.dataTransfer.getData(crossDragDataType)
                        if (!draggedTabId) return
                        setDragOverTabId(null)
                        if (fromSamePanel) onReorderTab(draggedTabId, null)
                        else onCrossDropTab(draggedTabId, null)
                    }}
                >
                    {tabs.map((tab, index) => {
                        const isActive = tab.id === activeTabId
                        const entry = tab.type === "component" ? currentEntry(tab as ComponentTab) : null
                        const title = entry ? entry.title : (tab as { title: string }).title
                        const description = entry?.description ?? (tab.type === "panel" ? tab.description : undefined)
                        return (
                            <div
                                key={tab.id}
                                role="tab"
                                aria-selected={isActive}
                                className={css({
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.5rem",
                                    minWidth: 0,
                                    maxWidth: "320px",
                                    flexShrink: 0,
                                    cursor: "pointer",
                                    userSelect: "none",
                                    borderRight: "1px solid",
                                    borderRightColor: "neutral/10",
                                    transition: "background 0.1s, box-shadow 0.1s",
                                    borderBottom: "2px solid transparent",
                                    _selected: {
                                        borderBottomColor: "primary",
                                    },
                                })}
                                style={{
                                    boxShadow:
                                        dragOverTabId === tab.id
                                            ? "inset 2px 0 0 var(--colors-primary)"
                                            : "none",
                                }}
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData(dragDataType, tab.id)
                                    e.dataTransfer.effectAllowed = "move"
                                }}
                                onDragEnd={(e) => {
                                    setDragOverTabId(null)
                                    if (!isRightPanel && e.dataTransfer.dropEffect === "none") {
                                        window.dispatchEvent(
                                            new CustomEvent("arrhes:split-tab", {
                                                detail: { tabId: tab.id },
                                            }),
                                        )
                                    }
                                }}
                                onDragOver={(e) => {
                                    if (
                                        e.dataTransfer.types.includes("application/arrhes-left-tab") ||
                                        e.dataTransfer.types.includes("application/arrhes-right-tab")
                                    ) {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        const rect = e.currentTarget.getBoundingClientRect()
                                        const insertBeforeTabId =
                                            e.clientX < rect.left + rect.width / 2
                                                ? tab.id
                                                : (tabs[index + 1]?.id ?? null)
                                        setDragOverTabId(insertBeforeTabId)
                                    }
                                }}
                                onDragLeave={(e) => {
                                    if (!e.currentTarget.contains(e.relatedTarget as Node | null))
                                        setDragOverTabId(null)
                                }}
                                onDrop={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setDragOverTabId(null)
                                    const fromSamePanel = e.dataTransfer.types.includes(dragDataType)
                                    const draggedTabId = fromSamePanel
                                        ? e.dataTransfer.getData(dragDataType)
                                        : e.dataTransfer.getData(crossDragDataType)
                                    if (!draggedTabId) return
                                    const rect = e.currentTarget.getBoundingClientRect()
                                    const insertBeforeTabId =
                                        e.clientX < rect.left + rect.width / 2
                                            ? tab.id
                                            : (tabs[index + 1]?.id ?? null)
                                    if (fromSamePanel) onReorderTab(draggedTabId, insertBeforeTabId)
                                    else onCrossDropTab(draggedTabId, insertBeforeTabId)
                                }}
                                onClick={() => onActivateTab(tab.id)}
                                onContextMenu={() => setContextMenuTabId(tab.id)}
                            >
                                <span
                                    className={css({
                                        paddingLeft: "0.5rem",
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        minWidth: 0,
                                    })}
                                    title={description ? `${title} — ${description}` : title}
                                >
                                    <span
                                        className={css({
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            fontSize: "0.8125rem",
                                            fontWeight: isActive ? "600" : "400",
                                            color: isActive ? "primary/800" : "neutral/600",
                                        })}
                                    >
                                        {title}
                                    </span>
                                    {description && (
                                        <span
                                            className={css({
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                fontSize: "0.6875rem",
                                                color: "neutral/400",
                                            })}
                                        >
                                            {description}
                                        </span>
                                    )}
                                </span>
                                <Button
                                    aria-label={`Fermer l'onglet ${title}`}
                                    className={css({})}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onCloseTab(tab.id)
                                    }}
                                >
                                    <ButtonGhostContent leftIcon={<IconX />} />
                                </Button>
                            </div>
                        )
                    })}

                    {!isRightPanel && (
                        <div
                            className={css({
                                paddingX: tabs.length === 0 ? "1rem" : "0.5rem",
                                paddingY: "0.5rem",
                            })}
                        >
                            <Button
                                aria-label="Nouvel onglet"
                                onClick={() => window.dispatchEvent(new CustomEvent("arrhes:open-palette"))}
                            >
                                <ButtonGhostContent leftIcon={<IconPlus />} />
                            </Button>
                        </div>
                    )}

                    {rightSlot && (
                        <div
                            className={css({
                                marginLeft: "auto",
                                display: "flex",
                                alignItems: "center",
                                paddingX: "0.5rem",
                                flexShrink: 0,
                                borderLeft: "1px solid",
                                borderLeftColor: "neutral/10",
                            })}
                        >
                            {rightSlot}
                        </div>
                    )}
                </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
                {contextTab ? (
                    <>
                        <ContextMenu.Item
                            leftIcon={<IconChevronLeft size={15} />}
                            disabled={!contextTabCanGoBack}
                            onSelect={() => navigateBack(contextTab.id)}
                        >
                            Retour
                        </ContextMenu.Item>
                        <ContextMenu.Item
                            leftIcon={<IconChevronRight size={15} />}
                            disabled={!contextTabCanGoForward}
                            onSelect={() => navigateForward(contextTab.id)}
                        >
                            Suivant
                        </ContextMenu.Item>
                        <ContextMenu.Separator />
                        {!isRightPanel && (
                            <ContextMenu.Item
                                leftIcon={<IconLayoutColumns size={15} />}
                                onSelect={() =>
                                    window.dispatchEvent(
                                        new CustomEvent("arrhes:split-tab", {
                                            detail: { tabId: contextTab.id },
                                        }),
                                    )
                                }
                            >
                                Ouvrir en vue divisée
                            </ContextMenu.Item>
                        )}
                        <ContextMenu.Item
                            leftIcon={<IconX size={15} />}
                            onSelect={() => onCloseTab(contextTab.id)}
                        >
                            Fermer l'onglet
                        </ContextMenu.Item>
                    </>
                ) : (
                    <>
                        {tabs.length > 1 && (
                            <ContextMenu.Item
                                onSelect={() => {
                                    const keepId = activeTabId
                                    for (const t of tabs) {
                                        if (t.id !== keepId) onCloseTab(t.id)
                                    }
                                }}
                            >
                                Fermer les autres onglets
                            </ContextMenu.Item>
                        )}
                        {onMergePanels && (
                            <ContextMenu.Item
                                leftIcon={<IconLayoutColumns size={15} />}
                                onSelect={onMergePanels}
                            >
                                Fusionner les panneaux
                            </ContextMenu.Item>
                        )}
                    </>
                )}
            </ContextMenu.Content>
        </ContextMenu.Root>
    )
}
