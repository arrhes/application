import { readOrganizationSubscriptionRouteDefinition } from "@arrhes/application-metadata/routes"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconMessageChatbot } from "@tabler/icons-react"
import { Link, Outlet, useParams } from "@tanstack/react-router"
import { useCallback, useState } from "react"
import { Banner } from "../../../components/layouts/banner.tsx"
import { Page } from "../../../components/layouts/page/page.tsx"
import { agentOrganizationPathRoute } from "../../../routes/root/dashboard/agent/agentOrganizationPathRoute.tsx"
import { useDataFromAPI } from "../../../utilities/useHTTPData.ts"
import { AgentSessionList } from "../../agent/agentSessionList.tsx"
import { AgentActiveSessionContext } from "./agentActiveSessionContext.tsx"

function AgentBanner() {
    return (
        <Banner variant="information" title="Assistant IA">
            L'assistant comptable est une fonctionnalité premium. Abonnez-vous au plan Avancé pour y accéder.
        </Banner>
    )
}

export function AgentPage() {
    const { idOrganization } = useParams({ from: agentOrganizationPathRoute.id })
    const [activeSessionId, setActiveSessionId] = useState<string | undefined>(undefined)

    const handleSetActiveSessionId = useCallback((id: string | undefined) => {
        setActiveSessionId(id)
    }, [])

    const subscription = useDataFromAPI({
        routeDefinition: readOrganizationSubscriptionRouteDefinition,
        body: {},
    })

    const isPremium = subscription.data?.isPremium === true

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
                    <AgentBanner />
                </Page.Content>
            </Page.Root>
        )
    }

    return (
        <AgentActiveSessionContext.Provider value={{ activeSessionId, setActiveSessionId: handleSetActiveSessionId }}>
            <Page.Root>
                <Page.Content>
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            gap: "1rem",
                            height: "calc(100vh - 12rem)",
                            minHeight: "24rem",
                        })}
                    >
                        {/* Session sidebar */}
                        <div
                            className={css({
                                width: "16rem",
                                flexShrink: 0,
                                display: "flex",
                                flexDirection: "column",
                                borderRight: "1px solid",
                                borderColor: "neutral/10",
                                paddingRight: "1rem",
                                overflowY: "auto",
                            })}
                        >
                            <div
                                className={css({
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    paddingBottom: "0.75rem",
                                    borderBottom: "1px solid",
                                    borderColor: "neutral/10",
                                    marginBottom: "0.5rem",
                                })}
                            >
                                <IconMessageChatbot size={16} className={css({ color: "neutral/50" })} />
                                <span className={css({ fontSize: "sm", fontWeight: "semibold", color: "neutral" })}>
                                    Conversations
                                </span>
                            </div>
                            <Link
                                to="/dashboard/agent/outils"
                                className={css({
                                    fontSize: "xs",
                                    color: "primary",
                                    textDecoration: "underline",
                                    marginBottom: "0.5rem",
                                })}
                            >
                                Voir la liste des outils
                            </Link>
                            <AgentSessionList idOrganization={idOrganization} />
                        </div>

                        {/* Chat area — rendered by child route */}
                        <div
                            className={css({
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                minWidth: 0,
                                border: "1px solid",
                                borderColor: "neutral/10",
                                borderRadius: "md",
                                overflow: "hidden",
                            })}
                        >
                            <Outlet />
                        </div>
                    </div>
                </Page.Content>
            </Page.Root>
        </AgentActiveSessionContext.Provider>
    )
}
