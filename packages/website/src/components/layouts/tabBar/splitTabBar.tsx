import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react"
import { useState } from "react"
import { type ComponentTab, currentEntry, useTabs } from "../../../contexts/tabs/tabsContext.js"

type Props = {
    tabIds: string[]
    activeTabId: string
    onActivate: (tabId: string) => void
    onRemove: (tabId: string) => void
    onReorder: (tabId: string, insertBeforeTabId: string | null) => void
    onDropFromLeft: (tabId: string, insertBeforeTabId: string | null) => void
}

export function SplitTabBar({ tabIds, activeTabId, onActivate, onRemove, onReorder, onDropFromLeft }: Props) {
    const { tabs, navigateBack, navigateForward } = useTabs()
    const [dragOverTabId, setDragOverTabId] = useState<string | null>(null)
    const panelTabs = tabIds.flatMap((id) => {
        const t = tabs.find((x) => x.id === id)
        return t ? [t] : []
    })

    function handleDrop(e: React.DragEvent<HTMLDivElement>, insertBeforeTabId: string | null) {
        e.preventDefault()
        e.stopPropagation()
        setDragOverTabId(null)
        const fromLeft = e.dataTransfer.types.includes("application/arrhes-left-tab")
        const draggedId = fromLeft
            ? e.dataTransfer.getData("application/arrhes-left-tab")
            : e.dataTransfer.getData("application/arrhes-right-tab")
        if (!draggedId) return
        if (fromLeft) onDropFromLeft(draggedId, insertBeforeTabId)
        else onReorder(draggedId, insertBeforeTabId)
    }

    return (
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
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
            })}
            role="tablist"
            onDragOver={(e) => {
                if (
                    e.dataTransfer.types.includes("application/arrhes-left-tab") ||
                    e.dataTransfer.types.includes("application/arrhes-right-tab")
                )
                    e.preventDefault()
            }}
            onDrop={(e) => handleDrop(e, null)}
        >
            {panelTabs.map((tab) => {
                const isActive = tab.id === activeTabId
                const title =
                    tab.type === "component"
                        ? currentEntry(tab as ComponentTab).title
                        : (
                              tab as {
                                  title: string
                              }
                          ).title
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
                            cursor: "grab",
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
                            e.dataTransfer.setData("application/arrhes-right-tab", tab.id)
                            e.dataTransfer.effectAllowed = "move"
                        }}
                        onDragEnd={() => setDragOverTabId(null)}
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
                        onDrop={(e) => handleDrop(e, tab.id)}
                        onClick={() => onActivate(tab.id)}
                    >
                        {tab.type === "component" && (
                            <>
                                <Button
                                    aria-label="Retour"
                                    isDisabled={(tab as ComponentTab).historyIndex <= 0}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        navigateBack(tab.id)
                                    }}
                                >
                                    <ButtonGhostContent leftIcon={<IconChevronLeft />} />
                                </Button>
                                <Button
                                    aria-label="Suivant"
                                    isDisabled={
                                        (tab as ComponentTab).historyIndex >=
                                        (tab as ComponentTab).history.length - 1
                                    }
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
                            onClick={(e) => {
                                e.stopPropagation()
                                onRemove(tab.id)
                            }}
                        >
                            <ButtonGhostContent leftIcon={<IconX size={14} />} />
                        </Button>
                    </div>
                )
            })}

        </div>
    )
}
