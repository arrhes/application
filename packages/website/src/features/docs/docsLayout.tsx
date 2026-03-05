import { ButtonGhostContent, ButtonPlainContent, Logo } from "@arrhes/ui"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { IconBook2, IconBrandGithub } from "@tabler/icons-react"
import { Outlet, useRouterState } from "@tanstack/react-router"
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
                    borderColor: "neutral/10",
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
                        borderColor: "neutral/10",
                    })}
                >
                    <div
                        className={css({
                            width: "100%",
                            maxWidth: "xl",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
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
                                <Logo withText />
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
                        paddingX: "1rem",
                        paddingY: "0.5rem",
                        backgroundColor: "background",
                    })}
                >
                    <div
                        className={css({
                            width: "100%",
                            maxWidth: "xl",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            overflowX: "auto",
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
                    padding: "1rem",
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
                                width: "16rem",
                                borderRight: "1px solid",
                                borderRightColor: "neutral/10",
                                overflowY: "auto",
                                flexShrink: 0,
                                display: "flex",
                            }),
                        )}
                    >
                        <SidebarNavigation navigation={currentSection.navigation} pathname={pathname} />
                    </aside>

                    {/* Main content */}
                    <main
                        className={css({
                            flex: "1",
                            minWidth: "0",
                            display: "flex",
                            justifyContent: "start",
                        })}
                    >
                        <div
                            className={css({
                                width: "100%",
                                paddingX: { base: "1rem", md: "2rem" },
                                paddingY: { base: "1.5rem", md: "2rem" },
                                paddingRight: { base: "1rem", md: "0" },
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
