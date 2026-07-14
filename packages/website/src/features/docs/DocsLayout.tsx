import { Button, ButtonGhostContent, ButtonOutlineContent, ButtonPlainContent, Logo } from "@arrhes/ui"
import { cn, css } from "@arrhes/ui/utilities/cn.js"
import { IconBook2, IconBrandGithub, IconHeart, IconMenu } from "@tabler/icons-react"
import { Outlet, useRouterState } from "@tanstack/react-router"
import { useState } from "react"
import { LinkButton } from "../../components/LinkButton.js"
import { DocsSearch } from "./DocsSearch.js"
import { docSections } from "./docSections.js"
import { SectionTab } from "./SectionTab.js"
import { SidebarNavigation } from "./SidebarNavigation.js"

type DocSectionId = keyof typeof docSections

function getCurrentSection(pathname: string): DocSectionId {
    if (pathname.startsWith("/documentation/comptabilité")) return "comptabilite"
    if (pathname.startsWith("/documentation/guide")) return "guide"
    if (pathname.startsWith("/documentation/dashboard")) return "dashboard"
    if (pathname.startsWith("/documentation/api")) return "api"
    if (pathname.startsWith("/documentation/cli")) return "cli"
    return "general"
}

export function DocsLayout() {
    const pathname = useRouterState({
        select: (s) => s.location.pathname,
    })
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const currentSectionId = getCurrentSection(pathname)
    const currentSection = docSections[currentSectionId]

    return (
        <div
            className={css({
                width: "100%",
                height: "100vh",
                display: "grid",
                gridTemplateRows: "auto minmax(0, 1fr)",
                backgroundColor: "background",
                overflow: "hidden",
            })}
        >
            {/* Header */}
            <header
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/10",
                    backgroundColor: "white",
                    position: "sticky",
                    top: "0",
                    zIndex: "20",
                })}
            >
                {/* Top bar */}
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "1rem",
                        borderBottom: "1px solid",
                        borderBottomColor: "neutral/10",
                    })}
                >
                    <div
                        className={css({
                            width: "100%",
                            // maxWidth: "xl",
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "1rem",
                        })}
                    >
                        <div
                            className={css({
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                flexShrink: 0,
                            })}
                        >
                            <LinkButton to="/">
                                <ButtonGhostContent
                                    leftIcon={<Logo />}
                                    text="Arrhes"
                                />
                            </LinkButton>

                            <span
                                className={css({
                                    color: "neutral/20",
                                    display: {
                                        base: "none",
                                        sm: "block",
                                    },
                                })}
                            >
                                /
                            </span>

                            <LinkButton
                                to="/documentation"
                                className={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.25rem",
                                    fontSize: "sm",
                                    color: "neutral/60",
                                    _hover: {
                                        color: "neutral",
                                    },
                                }}
                            >
                                <ButtonGhostContent
                                    leftIcon={<IconBook2 />}
                                    text="Documentation"
                                />
                            </LinkButton>
                        </div>

                        <DocsSearch />

                        <nav
                            className={css({
                                marginLeft: "auto",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                flexShrink: 0,
                            })}
                        >
                            <a
                                href="https://github.com/arrhes"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ButtonGhostContent leftIcon={<IconBrandGithub />} />
                            </a>
                            <a
                                href="https://payment-links.mollie.com/payment/QHxRXo6269KKB2fUa3YcR"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Faire un don"
                            >
                                <ButtonOutlineContent
                                    leftIcon={<IconHeart />}
                                    text="Faire un don"
                                />
                            </a>
                            <a
                                href={import.meta.env.VITE_DASHBOARD_BASE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ButtonPlainContent text="Dashboard" />
                            </a>
                        </nav>
                    </div>
                </div>

                {/* Section tabs */}
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "1rem",
                        backgroundColor: "background",
                    })}
                >
                    <div
                        className={css({
                            width: "100%",
                            // maxWidth: "xl",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "0.25rem",
                        })}
                    >
                        {Object.values(docSections).map((section) => (
                            <SectionTab
                                key={section.id}
                                section={section}
                                isActive={currentSectionId === section.id}
                            />
                        ))}
                    </div>
                </div>
            </header>

            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    backgroundColor: "white",
                    height: "100%",
                    minHeight: "0",
                    overflow: "hidden",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        // maxWidth: "xl",
                        display: "flex",
                        height: "100%",
                        minHeight: "0",
                        overflow: "hidden",
                    })}
                >
                    {/* Sidebar */}
                    <aside
                        className={cn(
                            css({
                                borderRight: "1px solid",
                                borderRightColor: "neutral/10",
                                overflowX: "hidden",
                                overflowY: "auto",
                                flexShrink: 0,
                                display: {
                                    base: "none",
                                    md: "flex",
                                },
                                alignSelf: "stretch",
                                height: "100%",
                                boxSizing: "border-box",
                                padding: "1rem",
                            }),
                        )}
                    >
                        <SidebarNavigation
                            navigation={currentSection.navigation}
                            pathname={pathname}
                            onClick={() => {
                                setIsMenuOpen(false)
                            }}
                        />
                    </aside>

                    {/* Main content */}
                    <main
                        className={css({
                            flex: "1",
                            minWidth: "0",
                            minHeight: "0",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            overflowY: "auto",
                        })}
                    >
                        <div
                            className={css({
                                display: {
                                    base: "flex",
                                    md: "none",
                                },
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "start",
                                gap: "0.5rem",
                                width: "100%",
                                padding: "1rem",
                                borderBottom: "1px solid",
                                borderBottomColor: "neutral/10",
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
                            {isMenuOpen === false ? null : (
                                <SidebarNavigation
                                    navigation={currentSection.navigation}
                                    pathname={pathname}
                                />
                            )}
                        </div>
                        <div
                            className={css({
                                width: "100%",
                                padding: {
                                    base: "1rem",
                                    md: "2rem",
                                },
                            })}
                        >
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
