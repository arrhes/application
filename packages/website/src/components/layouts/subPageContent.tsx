import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import type { Icon, IconProps } from "@tabler/icons-react"
import { IconLayoutColumns, IconX } from "@tabler/icons-react"
import { type ReactElement, type ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { Popover } from "../overlays/popover/popover.js"

type SectionItem = {
    key: string
    label: string
    icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    content: ReactNode
}

type Section = {
    title?: string
    icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    items: SectionItem[]
}

type Props = {
    sections: Record<string, Section>
    defaultKey?: string
}

type PanelProps = {
    allItems: SectionItem[]
    activeKey: string
    setActiveKey: (key: string) => void
    onOpenInSplit?: (key: string) => void
    rightSlot?: ReactNode
}

function Panel({ allItems, activeKey, setActiveKey, onOpenInSplit, rightSlot }: PanelProps) {
    const activeContent = allItems.find((i) => i.key === activeKey)?.content ?? null
    const [contextMenuKey, setContextMenuKey] = useState<string | null>(null)

    // Capture phase fires before the browser decides to show the native context menu.
    useEffect(() => {
        function suppressBrowserMenu(e: MouseEvent) {
            if ((e.target as HTMLElement | null)?.closest?.("[data-tab-context]")) {
                e.preventDefault()
            }
        }
        document.addEventListener("contextmenu", suppressBrowserMenu, {
            capture: true,
        })
        return () =>
            document.removeEventListener("contextmenu", suppressBrowserMenu, {
                capture: true,
            })
    }, [])

    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                minWidth: "0",
                height: "100%",
            })}
        >
            {/* Tab bar */}
            <div
                className={css({
                    flexShrink: "0",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    paddingX: "1rem",
                    paddingY: "0.5rem",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/10",
                })}
            >
                {allItems.map((item) => (
                    <Popover.Root
                        key={item.key}
                        open={contextMenuKey === item.key}
                        onOpenChange={(open) => {
                            if (!open) setContextMenuKey(null)
                        }}
                    >
                        <PopoverPrimitive.Anchor asChild>
                            <span
                                data-tab-context={item.key}
                                onContextMenu={(e) => {
                                    e.preventDefault()
                                    setContextMenuKey(item.key)
                                }}
                            >
                                <Button
                                    onClick={(e) => {
                                        if ((e.ctrlKey || e.metaKey) && onOpenInSplit) {
                                            e.preventDefault()
                                            onOpenInSplit(item.key)
                                        } else {
                                            setActiveKey(item.key)
                                        }
                                    }}
                                >
                                    <ButtonGhostContent
                                        leftIcon={item.icon}
                                        text={item.label}
                                        isCurrent={item.key === activeKey}
                                    />
                                </Button>
                            </span>
                        </PopoverPrimitive.Anchor>
                        <Popover.Content
                            className={css({
                                padding: "0.375rem",
                            })}
                            side="bottom"
                            align="start"
                        >
                            <Button
                                className={css({
                                    width: "100%",
                                })}
                                onClick={() => {
                                    setActiveKey(item.key)
                                    setContextMenuKey(null)
                                }}
                            >
                                <ButtonGhostContent
                                    text="Ouvrir dans ce panneau"
                                    className={css({
                                        width: "100%",
                                        justifyContent: "start",
                                    })}
                                />
                            </Button>
                            {onOpenInSplit && (
                                <Button
                                    className={css({
                                        width: "100%",
                                    })}
                                    onClick={() => {
                                        onOpenInSplit(item.key)
                                        setContextMenuKey(null)
                                    }}
                                >
                                    <ButtonGhostContent
                                        leftIcon={<IconLayoutColumns size={15} />}
                                        text="Ouvrir dans le panneau de droite"
                                        className={css({
                                            width: "100%",
                                            justifyContent: "start",
                                        })}
                                    />
                                </Button>
                            )}
                        </Popover.Content>
                    </Popover.Root>
                ))}
                {rightSlot && (
                    <div
                        className={css({
                            marginLeft: "auto",
                            display: "flex",
                            gap: "0.25rem",
                        })}
                    >
                        {rightSlot}
                    </div>
                )}
            </div>

            {/* Active tab content */}
            <div
                className={css({
                    width: "100%",
                    padding: {
                        base: "1rem",
                        md: "2rem",
                    },
                })}
            >
                {activeContent}
            </div>
        </div>
    )
}

/** State-based tab navigation — no TanStack Router required. */
export function SubPageContent({ sections, defaultKey }: Props) {
    const allItems = Object.values(sections).flatMap((s) => s.items)
    const firstKey = defaultKey ?? allItems[0]?.key ?? ""

    const [activeKey, setActiveKey] = useState(firstKey)
    const [splitEnabled, setSplitEnabled] = useState(false)
    const [splitPosition, setSplitPosition] = useState(50)

    const defaultRightKey = allItems.find((i) => i.key !== firstKey)?.key ?? firstKey
    const [activeKeyRight, setActiveKeyRight] = useState(defaultRightKey)

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
            e.preventDefault()
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

    // Clean up listeners on unmount
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

    const closeSplit = useCallback(() => {
        setSplitEnabled(false)
        setSplitPosition(50)
    }, [])

    const handleOpenInSplit = useCallback((key: string) => {
        setActiveKeyRight(key)
        setSplitEnabled(true)
    }, [])

    if (!splitEnabled) {
        return (
            <div
                className={css({
                    width: "100%",
                    flex: "1",
                    flexShrink: "0",
                    display: "flex",
                    flexDirection: "column",
                })}
            >
                <Panel
                    allItems={allItems}
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    onOpenInSplit={allItems.length > 1 ? handleOpenInSplit : undefined}
                    rightSlot={
                        allItems.length > 1 ? (
                            <Button onClick={() => setSplitEnabled(true)}>
                                <ButtonGhostContent
                                    leftIcon={<IconLayoutColumns size={15} />}
                                    text=""
                                />
                            </Button>
                        ) : undefined
                    }
                />
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className={css({
                width: "100%",
                flex: "1",
                flexShrink: "0",
                display: "flex",
                flexDirection: "row",
                overflow: "hidden",
            })}
        >
            {/* Left panel */}
            <div
                style={{
                    width: `${splitPosition}%`,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Panel
                    allItems={allItems}
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    onOpenInSplit={handleOpenInSplit}
                    rightSlot={
                        <Button onClick={() => setSplitEnabled(false)}>
                            <ButtonGhostContent
                                leftIcon={<IconLayoutColumns size={15} />}
                                text=""
                                isCurrent={true}
                            />
                        </Button>
                    }
                />
            </div>

            {/* Drag handle */}
            <div
                className={css({
                    flexShrink: "0",
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
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Panel
                    allItems={allItems}
                    activeKey={activeKeyRight}
                    setActiveKey={setActiveKeyRight}
                    onOpenInSplit={handleOpenInSplit}
                    rightSlot={
                        <Button onClick={closeSplit}>
                            <ButtonGhostContent
                                leftIcon={<IconX size={15} />}
                                text=""
                            />
                        </Button>
                    }
                />
            </div>
        </div>
    )
}
