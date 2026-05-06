import {
    readAllAgentSessionsRouteDefinition,
    readOrganizationBillingRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { Button, ButtonGhostContent, ButtonOutlineContent, formatDateTime, LinkButton } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconMenu, IconMessage, IconPlus } from "@tabler/icons-react"
import { Outlet, useNavigate, useParams } from "@tanstack/react-router"
import { useState } from "react"
import { Banner } from "../../../../components/layouts/banner.tsx"
import { EmptyState } from "../../../../components/layouts/emptyState.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { SearchBar } from "../../../../components/layouts/searchBar.tsx"
import { organizationPathRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationPathRoute.tsx"
import { useDataFromAPI } from "../../../../utilities/useHTTPData.ts"
import { extractSnippet } from "./extractSnippet.ts"

export function AgentLayout() {
    const params = useParams({ from: organizationPathRoute.id })
    const [activeSessionId, setActiveSessionId] = useState<string | undefined>(undefined)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()
    const [search, setSearch] = useState("")

    const subscription = useDataFromAPI({
        routeDefinition: readOrganizationBillingRouteDefinition,
        body: {},
    })

    const isPremium = (subscription.data?.agentTokensMonthlyLimit ?? 0) > 0

    // Use the context's activeSessionId (set by chat on session-created) if available,
    // otherwise fall back to the URL param (set by TanStack Router on navigation)
    const currentSessionId = activeSessionId ?? params.idAgentSession

    const searchTrimmed = search.trim()

    const { data: sessions } = useDataFromAPI({
        routeDefinition: readAllAgentSessionsRouteDefinition,
        body: searchTrimmed
            ? { idOrganization: params.idOrganization, search: searchTrimmed }
            : { idOrganization: params.idOrganization },
    })

    const displaySessions = sessions ?? []

    const sidebarContent = (
        <div
            className={css({
                width: "16rem",
                flexShrink: 0,
                display: { base: "none", md: "flex" },
                flexDirection: "column",
                borderRight: "1px solid",
                borderRightColor: "neutral/10",
                overflow: "hidden",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/10",
                    flexShrink: 0,
                    padding: "1rem",
                })}
            >
                {/* <LinkButton to="/dashboard/organisations/$idOrganization/agent" params={{ idOrganization: params.idOrganization }}>
                    <ButtonGhostContent leftIcon={<IconRobot />} text="Assistant" />
                </LinkButton> */}
                <SearchBar value={search} onChange={setSearch} placeholder="Rechercher une session..." />
                <Button
                    onClick={() => {
                        setActiveSessionId(undefined)
                        setIsMenuOpen(false)
                        navigate({
                            to: "/dashboard/organisations/$idOrganization/agent",
                            params: { idOrganization: params.idOrganization },
                        })
                    }}
                >
                    <ButtonOutlineContent leftIcon={<IconPlus />} />
                </Button>
            </div>
            <div className={css({ flex: 1, overflowY: "auto", minHeight: 0, padding: "1rem" })}>
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        width: "100%",
                    })}
                >
                    {displaySessions.length === 0 ? (
                        <EmptyState icon={<IconMessage />} title="Aucune session" subtitle={undefined} />
                    ) : null}
                    {displaySessions.map((session) => {
                        const snippet =
                            searchTrimmed && session.matchedContent
                                ? extractSnippet(session.matchedContent, searchTrimmed)
                                : undefined

                        return (
                            <LinkButton
                                key={session.id}
                                to="/dashboard/organisations/$idOrganization/agent/sessions/$idAgentSession"
                                params={{ idOrganization: params.idOrganization, idAgentSession: session.id }}
                            >
                                <div
                                    className={css({
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        padding: "0.5rem",
                                        borderRadius: "md",
                                        cursor: "pointer",
                                        fontSize: "sm",
                                        background: "none",
                                        border: "none",
                                        color: "neutral",
                                        textAlign: "left",
                                        width: "100%",
                                        overflow: "hidden",
                                        backgroundColor: session.id === currentSessionId ? "primary/5" : "transparent",
                                        _hover: {
                                            backgroundColor: "primary/5",
                                        },
                                    })}
                                >
                                    <span
                                        className={css({
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            width: "100%",
                                        })}
                                    >
                                        {session.title ?? formatDateTime(session.createdAt)}
                                    </span>
                                    {session.title && (
                                        <span
                                            className={css({
                                                fontSize: "xs",
                                                color: "neutral/40",
                                                whiteSpace: "nowrap",
                                            })}
                                        >
                                            {formatDateTime(session.createdAt)}
                                        </span>
                                    )}
                                    {snippet && (
                                        <span
                                            className={css({
                                                fontSize: "xs",
                                                color: "neutral/40",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                width: "100%",
                                                marginTop: "0.125rem",
                                            })}
                                        >
                                            {snippet}
                                        </span>
                                    )}
                                </div>
                            </LinkButton>
                        )
                    })}
                </div>
            </div>
        </div>
    )

    if (subscription.isPending) {
        return (
            <Page.Root>
                <Page.Content>
                    <div
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "4rem",
                            color: "neutral/30",
                            fontSize: "sm",
                        })}
                    >
                        Chargement...
                    </div>
                </Page.Content>
            </Page.Root>
        )
    }

    if (!isPremium) {
        return (
            <Page.Root>
                <Page.Content>
                    <Banner variant="information" title="Assistant IA">
                        L'assistant comptable est une fonctionnalité premium. Abonnez-vous au plan Avancé pour y
                        accéder.
                    </Banner>
                </Page.Content>
            </Page.Root>
        )
    }

    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "row",
                width: "100%",
                flex: 1,
                minHeight: 0,
                overflow: "hidden",
            })}
        >
            {/* Sidebar — visible on md+ */}
            {sidebarContent}

            {/* Content area — rendered by child route */}
            <div
                className={css({
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    minHeight: 0,
                    overflow: "hidden",
                })}
            >
                {/* Mobile hamburger toggle */}
                <div
                    className={css({
                        display: { base: "flex", md: "none" },
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "0.5rem",
                        width: "100%",
                        borderBottom: "1px solid",
                        borderBottomColor: "neutral/10",
                    })}
                >
                    <Button
                        aria-label="Menu"
                        className={css({ margin: "1rem" })}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <ButtonGhostContent leftIcon={<IconMenu />} />
                    </Button>
                    {isMenuOpen && (
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                borderTop: "1px solid",
                                borderTopColor: "neutral/10",
                            })}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {sidebarContent}
                        </div>
                    )}
                </div>
                <div
                    className={css({
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 0,
                        minHeight: 0,
                        overflow: "hidden",
                    })}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
