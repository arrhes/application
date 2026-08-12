import { Button, ButtonGhostContent, Logo } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import { IconBrandGithub, IconBrandX, IconMenu } from "@tabler/icons-react"
import { useRouterState } from "@tanstack/react-router"
import { useRef, useState } from "react"
import version from "../../../../../VERSION?raw"
import { LinkButton } from "../../components/LinkButton.tsx"
import { useSidebarContext } from "../../contexts/sidebar/SidebarContext.tsx"
import { DocsSearch } from "./DocsSearch.tsx"
import { nodeItems } from "./nodeItems.tsx"
import { SidebarNavigation } from "./SidebarNavigation.tsx"

export function AppSidebar() {
    const sidebar = useSidebarContext()
    const sidebarRef = useRef<HTMLDivElement>(null)
    const pathname = useRouterState({
        select: (s) => s.location.pathname,
    })
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            {/* Sidebar */}
            <div
                ref={sidebarRef}
                style={{
                    width: sidebar.width,
                }}
                className={css({
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    overflow: "hidden",
                    borderRight: "1px solid",
                    borderRightColor: "neutral/10",
                    backgroundColor: "background",
                })}
            >
                {/* Sidebar top: logo + search */}
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        padding: "1rem",
                        borderBottom: "1px solid",
                        borderBottomColor: "neutral/10",
                        flexShrink: 0,
                        gap: "0.75rem",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "0.5rem",
                        })}
                    >
                        <div
                            className={css({
                                // borderTop: "1px solid",
                                // borderTopColor: "neutral/10",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "0.25rem",
                                flexShrink: 0,
                            })}
                        >
                            <LinkButton to="/">
                                <ButtonGhostContent
                                    leftIcon={<Logo />}
                                    text="Comptasse"
                                />
                            </LinkButton>
                            <span
                                className={css({
                                    color: "primary",
                                    fontWeight: "lighter",
                                    fontSize: "xs",
                                    lineHeight: 1,
                                })}
                            >
                                {version}
                            </span>
                        </div>

                        <div
                            className={css({
                                // borderTop: "1px solid",
                                // borderTopColor: "neutral/10",
                                display: "flex",
                                flexDirection: "row",
                                gap: "0.25rem",
                                flexShrink: 0,
                            })}
                        >
                            <a
                                href="https://x.com/comptasse"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Nous suivre sur X"
                            >
                                <ButtonGhostContent
                                    leftIcon={<IconBrandX />}
                                    // text="X (Twitter)"
                                />
                            </a>
                            <a
                                href="https://github.com/comptasse"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Contribuer sur Github"
                            >
                                <ButtonGhostContent
                                    leftIcon={<IconBrandGithub />}
                                    // text="GitHub"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Navigation tree */}
                <div
                    className={css({
                        flex: 1,
                        overflowY: "auto",
                        overflowX: "hidden",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        gap: "1rem",
                    })}
                >
                    <DocsSearch />
                    <SidebarNavigation
                        navigation={nodeItems}
                        pathname={pathname}
                        onClick={() => {
                            setIsMenuOpen(false)
                        }}
                    />
                </div>
            </div>

            {/* Sidebar resize handle */}
            <div
                role="separator"
                aria-orientation="vertical"
                aria-label="Redimensionner la barre latérale"
                tabIndex={0}
                className={css({
                    flexShrink: 0,
                    width: "4px",
                    cursor: "col-resize",
                    background: "transparent",
                    transition: "background 0.15s",
                    _hover: {
                        background: "neutral/5",
                    },
                    _focusVisible: {
                        background: "neutral/5",
                    },
                })}
                onMouseDown={(e) => {
                    const startX = e.clientX
                    const startW = sidebar.width
                    const onMove = (ev: MouseEvent) => {
                        const newWidth = Math.max(200, startW + (ev.clientX - startX))
                        if (sidebarRef.current) {
                            sidebarRef.current.style.width = `${newWidth}px`
                        }
                    }
                    const onUp = () => {
                        if (sidebarRef.current) {
                            const finalWidth = Number.parseInt(sidebarRef.current.style.width, 10)
                            sidebar.setWidth(finalWidth)
                        }
                        window.removeEventListener("mousemove", onMove)
                        window.removeEventListener("mouseup", onUp)
                        document.body.style.cursor = ""
                    }
                    document.body.style.cursor = "col-resize"
                    window.addEventListener("mousemove", onMove)
                    window.addEventListener("mouseup", onUp)
                }}
                onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") {
                        sidebar.setWidth(Math.max(200, sidebar.width - 10))
                        e.preventDefault()
                    } else if (e.key === "ArrowRight") {
                        sidebar.setWidth(sidebar.width + 10)
                        e.preventDefault()
                    }
                }}
            />

            {/* Mobile menu toggle */}
            <div
                className={css({
                    display: {
                        base: "flex",
                        md: "none",
                    },
                    position: "fixed",
                    top: "1rem",
                    left: "1rem",
                    zIndex: "20",
                })}
            >
                <Button
                    aria-label="Menu"
                    onClick={() => {
                        setIsMenuOpen(!isMenuOpen)
                    }}
                >
                    <ButtonGhostContent leftIcon={<IconMenu />} />
                </Button>
            </div>

            {/* Mobile sidebar overlay */}
            {isMenuOpen && (
                <button
                    type="button"
                    aria-label="Fermer le menu"
                    tabIndex={-1}
                    className={css({
                        display: {
                            base: "flex",
                            md: "none",
                        },
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: "15",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        border: 0,
                        padding: 0,
                        cursor: "pointer",
                    })}
                    onClick={() => {
                        setIsMenuOpen(false)
                    }}
                />
            )}
            {isMenuOpen && (
                <div
                    className={css({
                        display: {
                            base: "flex",
                            md: "none",
                        },
                        position: "fixed",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: "280px",
                        zIndex: "16",
                        flexDirection: "column",
                        padding: "1rem",
                        backgroundColor: "background",
                        borderRight: "1px solid",
                        borderRightColor: "neutral/10",
                        overflowY: "auto",
                    })}
                >
                    <SidebarNavigation
                        navigation={nodeItems}
                        pathname={pathname}
                        onClick={() => {
                            setIsMenuOpen(false)
                        }}
                    />
                </div>
            )}
        </>
    )
}
