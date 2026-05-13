import { readUserSessionRouteDefinition, signOutRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonGhostContent, ButtonOutlineContent, Logo, Separator, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import {
    IconBook2,
    IconLifebuoy,
    IconLogout,
    IconSearch,
    IconSettings,
    IconShield,
    IconTicket,
    IconUser,
} from "@tabler/icons-react"
import { Outlet } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { CommandPalette } from "../../components/layouts/commandPalette/commandPalette.js"
import { TabBar } from "../../components/layouts/tabBar/tabBar.js"
import { Popover } from "../../components/overlays/popover/popover.js"
import { type ComponentTab, currentEntry, useTabs } from "../../contexts/tabs/tabsContext.js"
import { TabContentArea } from "../../contexts/tabs/tabsProvider.js"
import { useOuterRouter } from "../../contexts/tabs/useOuterRouter.js"
import { deleteCookies } from "../../utilities/cookies/deleteCookies.js"
import { setCookie } from "../../utilities/cookies/setCookie.js"
import { getResponseBodyFromAPI } from "../../utilities/getResponseBodyFromAPI.js"
import { cookiePrefix } from "../../utilities/variables.js"
import { useDataFromAPI } from "../../utilities/useHTTPData.js"
import { OrganizationContextSelect } from "./OrganizationContextSelect.js"
import { YearContextSelect } from "./YearContextSelect.js"

const SELECTED_ORG_KEY = "arrhes:context-org"
const SELECTED_YEAR_KEY = "arrhes:context-year"

// ─── Inner shell — rendered inside TabsProvider ──────────────────────────────

export function DashboardShell() {
    const { tabs, activeTabId, openTab } = useTabs()
    const applicationRouter = useOuterRouter()
    const [selectedOrgId, setSelectedOrgId] = useState<string | null>(() => {
        try {
            const id = localStorage.getItem(SELECTED_ORG_KEY) ?? null
            if (id !== null) setCookie(`${cookiePrefix}_id_organization`, id)
            return id
        } catch {
            return null
        }
    })
    const [selectedYearId, setSelectedYearId] = useState<string | null>(() => {
        try {
            return localStorage.getItem(SELECTED_YEAR_KEY) ?? null
        } catch {
            return null
        }
    })

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
        setSelectedOrgId(id)
        try {
            if (id !== null) localStorage.setItem(SELECTED_ORG_KEY, id)
            else localStorage.removeItem(SELECTED_ORG_KEY)
        } catch {}
        if (id !== null) setCookie(`${cookiePrefix}_id_organization`, id)
        setSelectedYearId(null)
        try {
            localStorage.removeItem(SELECTED_YEAR_KEY)
        } catch {}
    }

    function handleYearChange(id: string | null) {
        setSelectedYearId(id)
        try {
            if (id !== null) localStorage.setItem(SELECTED_YEAR_KEY, id)
            else localStorage.removeItem(SELECTED_YEAR_KEY)
        } catch {}
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
                    <Button title="Arrhes">
                        <ButtonGhostContent
                            leftIcon={<Logo />}
                            text="Arrhes"
                        />
                    </Button>
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
                    <OrganizationContextSelect
                        value={selectedOrgId}
                        onChange={handleOrgChange}
                    />
                    {selectedOrgId !== null && (
                        <>
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

            {/* Tab bar */}
            <TabBar />

            {/* Tab content area */}
            <div
                className={css({
                    width: "100%",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    overflow: "hidden",
                    backgroundColor: "white",
                })}
            >
                <Outlet />
                <TabContentArea
                    activeTabId={activeTabId}
                    tabs={tabs}
                />
            </div>

            {/* Command palette / search */}
            <CommandPalette
                selectedOrgId={selectedOrgId}
                selectedYearId={selectedYearId}
            />
        </div>
    )
}
