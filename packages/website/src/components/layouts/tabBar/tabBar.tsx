import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconChevronRight, IconPlus, IconX } from "@tabler/icons-react"
import { type ComponentTab, currentEntry, useTabs } from "../../../contexts/tabs/tabsContext.js"

export function TabBar() {
    const { tabs, activeTabId, activateTab, closeTab, navigateBack, navigateForward } = useTabs()

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
                // Hide scrollbar visually but keep scrollability
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
            })}
            role="tablist"
        >
            {tabs.map((tab) => {
                const isActive = tab.id === activeTabId
                const title = tab.type === "component" ? currentEntry(tab as ComponentTab).title : tab.title
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
                            backgroundColor: "transparent",
                            borderBottom: "2px solid transparent",
                            _selected: {
                                borderBottomColor: "primary",
                            },
                        })}
                        onClick={() => activateTab(tab.id)}
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
        </div>
    )
}
