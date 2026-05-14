import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconChevronRight, IconLayoutColumns, IconPlus, IconX } from "@tabler/icons-react"
import { type ReactNode, useState } from "react"
import { type ComponentTab, currentEntry, useTabs } from "../../../contexts/tabs/tabsContext.js"
import { ContextMenu } from "../../overlays/contextMenu/contextMenu.js"

type TabBarProps = {
    excludeTabIds?: string[]
    rightSlot?: ReactNode
    onDropFromRight?: (tabId: string, insertBeforeTabId: string | null) => void
    onMergePanels?: () => void
}

export function TabBar({ excludeTabIds, rightSlot, onDropFromRight, onMergePanels }: TabBarProps = {}) {
    const { tabs: allTabs, activeTabId, activateTab, closeTab, navigateBack, navigateForward, reorderTabs } = useTabs()
    const tabs = allTabs.filter((t) => !excludeTabIds?.includes(t.id))
    const [dragOverTabId, setDragOverTabId] = useState<string | null>(null)
    const [contextMenuTabId, setContextMenuTabId] = useState<string | null>(null)
    const contextTab = contextMenuTabId !== null ? (tabs.find((t) => t.id === contextMenuTabId) ?? null) : null

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
                        const fromLeft = e.dataTransfer.types.includes("application/arrhes-left-tab")
                        const draggedTabId = fromLeft
                            ? e.dataTransfer.getData("application/arrhes-left-tab")
                            : e.dataTransfer.getData("application/arrhes-right-tab")
                        if (!draggedTabId) return
                        setDragOverTabId(null)
                        if (fromLeft) reorderTabs(draggedTabId, null)
                        else onDropFromRight?.(draggedTabId, null)
                    }}
                >
                    {tabs.map((tab) => {
                        const isActive = tab.id === activeTabId
                        const title =
                            tab.type === "component" ? currentEntry(tab as ComponentTab).title : tab.title
                        const canGoBack = tab.type === "component" && (tab as ComponentTab).historyIndex > 0
                        const canGoForward =
                            tab.type === "component" &&
                            (tab as ComponentTab).historyIndex < (tab as ComponentTab).history.length - 1
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
                                            transition: "background 0.1s",
                                            backgroundColor: dragOverTabId === tab.id ? "neutral/10" : "transparent",
                                            borderBottom: "2px solid transparent",
                                            _selected: {
                                                borderBottomColor: "primary",
                                            },
                                        })}
                                        draggable
                                        onDragStart={(e) => {
                                            e.dataTransfer.setData("application/arrhes-left-tab", tab.id)
                                            e.dataTransfer.effectAllowed = "move"
                                        }}
                                        onDragEnd={(e) => {
                                            setDragOverTabId(null)
                                            if (e.dataTransfer.dropEffect === "none") {
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
                                                setDragOverTabId(tab.id)
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
                                            const fromLeft = e.dataTransfer.types.includes(
                                                "application/arrhes-left-tab",
                                            )
                                            const draggedTabId = fromLeft
                                                ? e.dataTransfer.getData("application/arrhes-left-tab")
                                                : e.dataTransfer.getData("application/arrhes-right-tab")
                                            if (!draggedTabId) return
                                            if (fromLeft) reorderTabs(draggedTabId, tab.id)
                                            else onDropFromRight?.(draggedTabId, tab.id)
                                        }}
                                onClick={() => activateTab(tab.id)}
                                onContextMenu={() => setContextMenuTabId(tab.id)}
                            >
                                {tab.type === "component" && (
                                    <>
                                        <Button
                                            aria-label="Retour"
                                            isDisabled={!canGoBack}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                navigateBack(tab.id)
                                            }}
                                        >
                                            <ButtonGhostContent leftIcon={<IconChevronLeft />} />
                                        </Button>
                                        <Button
                                            aria-label="Suivant"
                                            isDisabled={!canGoForward}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                navigateForward(tab.id)
                                            }}
                                        >
                                            <ButtonGhostContent leftIcon={<IconChevronRight />} />
                                        </Button>
                                    </>
                                )}
                                <span
                                    className={css({
                                        paddingLeft: "0.5rem",
                                        flex: 1,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        fontSize: "0.8125rem",
                                        fontWeight: isActive ? "600" : "400",
                                        color: isActive ? "primary/800" : "neutral/600",
                                    })}
                                    title={title}
                                >
                                    {title}
                                </span>
                                <Button
                                    aria-label={`Fermer l'onglet ${title}`}
                                    className={css({})}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        closeTab(tab.id)
                                    }}
                                >
                                    <ButtonGhostContent leftIcon={<IconX />} />
                                </Button>
                            </div>
                        )
                    })}

                    {/* New tab button */}
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
                        <ContextMenu.Item
                            leftIcon={<IconX size={15} />}
                            onSelect={() => closeTab(contextTab.id)}
                        >
                            Fermer l'onglet
                        </ContextMenu.Item>
                        {tabs.length > 1 && (
                            <ContextMenu.Item
                                onSelect={() => {
                                    for (const t of tabs) {
                                        if (t.id !== contextTab.id) closeTab(t.id)
                                    }
                                }}
                            >
                                Fermer les autres onglets
                            </ContextMenu.Item>
                        )}
                    </>
                ) : onMergePanels ? (
                    <ContextMenu.Item
                        leftIcon={<IconLayoutColumns size={15} />}
                        onSelect={onMergePanels}
                    >
                        Fusionner les panneaux
                    </ContextMenu.Item>
                ) : null}
            </ContextMenu.Content>
        </ContextMenu.Root>
    )
}
