import { Button, ButtonGhostContent, ButtonPlainContent, Logo } from "@arrhes/ui"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { IconBook2, IconBrandGithub, IconMenu } from "@tabler/icons-react"
import { Outlet, useRouterState } from "@tanstack/react-router"
import { useState } from "react"
import { LinkButton } from "../../components/linkButton.js"
import { docSections } from "./docSections.js"
import { SectionTab } from "./sectionTab.js"
import { SidebarNavigation } from "./sidebarNavigation.js"

type DocSectionId = keyof typeof docSections

function getCurrentSection(pathname: string): DocSectionId {
    if (pathname.startsWith("/documentation/comptabilité")) return "comptabilite"
    if (pathname.startsWith("/documentation/dashboard")) return "dashboard"
    if (pathname.startsWith("/documentation/api")) return "api"
    // if (pathname.startsWith("/documentation/ai")) return "ai"
    return "general"
}

export function DocsLayout() {
    const pathname = useRouterState({ select: (s) => s.location.pathname })
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const currentSectionId = getCurrentSection(pathname)
    const currentSection = docSections[currentSectionId]

    return (
        <div
            className={css({
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background",
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
                            maxWidth: "xl",
                            display: "flex",
                            justifyContent: "space-between",
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
                            })}
                        >
                            <LinkButton to="/">
                                <Logo />
                            </LinkButton>

                            <span className={css({ color: "neutral/20", display: { base: "none", sm: "block" } })}>
                                /
                            </span>

                            <LinkButton
                                to="/documentation"
                                className={css({
                                    display: { base: "none", sm: "flex" },
                                    alignItems: "center",
                                    gap: "0.25rem",
                                    fontSize: "sm",
                                    color: "neutral/60",
                                    _hover: { color: "neutral" },
                                })}
                            >
                                <ButtonGhostContent leftIcon={<IconBook2 />} text="Documentation" />
                            </LinkButton>
                        </div>

                        <nav
                            className={css({
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <a href="https://github.com/arrhes" target="_blank" rel="noopener noreferrer">
                                <ButtonGhostContent leftIcon={<IconBrandGithub />} />
                            </a>
                            {/* <LinkButton to="/">
                                <ButtonContent
                                    text="Retour au site"
                                />
                            </LinkButton> */}
                            <LinkButton to="/dashboard">
                                <ButtonPlainContent text="Dashboard" />
                            </LinkButton>
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
                            maxWidth: "xl",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "0.25rem",
                        })}
                    >
                        {Object.values(docSections).map((section) => (
                            <SectionTab key={section.id} section={section} isActive={currentSectionId === section.id} />
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
                    flex: "1",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "xl",
                        display: "flex",
                        flex: "1",
                    })}
                >
                    {/* Sidebar */}
                    <aside
                        className={cx(
                            css({
                                borderRight: "1px solid",
                                borderRightColor: "neutral/10",
                                overflowY: "auto",
                                flexShrink: 0,
                                display: { base: "none", md: "flex" },
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
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                        })}
                    >
                        <div
                            className={css({
                                display: { base: "flex", md: "none" },
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
                                <SidebarNavigation navigation={currentSection.navigation} pathname={pathname} />
                            )}
                        </div>
                        <div
                            className={css({
                                width: "100%",
                                padding: { base: "1rem", md: "2rem" },
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
