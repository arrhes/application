import { readOrganizationSubscriptionRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonGhostContent, LinkButton } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus, IconRobot } from "@tabler/icons-react"
import { Outlet, useNavigate, useParams } from "@tanstack/react-router"
import { useCallback, useState } from "react"
import { Banner } from "../../../components/layouts/banner.tsx"
import { Page } from "../../../components/layouts/page/page.tsx"
import { organizationPathRoute } from "../../../routes/root/dashboard/organizations/$idOrganization/organizationPathRoute.tsx"
import { useDataFromAPI } from "../../../utilities/useHTTPData.ts"
import { AgentActiveSessionContext } from "./agentActiveSessionContext.tsx"
import { AgentSessionList } from "./agentSessionList.tsx"


export function AgentPage() {
    const { idOrganization } = useParams({ from: organizationPathRoute.id })
    const [activeSessionId, setActiveSessionId] = useState<string | undefined>(undefined)
    const navigate = useNavigate()

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
                    <Banner variant="information" title="Assistant IA">
                        L'assistant comptable est une fonctionnalité premium. Abonnez-vous au plan Avancé pour y accéder.
                    </Banner>
                </Page.Content>
            </Page.Root>
        )
    }

    return (
        <AgentActiveSessionContext.Provider value={{ activeSessionId, setActiveSessionId: handleSetActiveSessionId }}>
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
                {/* Sidebar */}
                <div
                    className={css({
                        width: "16rem",
                        flexShrink: 0,
                        display: { base: "none", lg: "flex" },
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
                        <LinkButton
                            to="/dashboard/organisations/$idOrganization/agent"
                            params={{ idOrganization }}
                        >
                            <ButtonGhostContent
                                leftIcon={<IconRobot />}
                                text="Assistant"
                            />
                        </LinkButton>
                        <Button
                            onClick={() => {
                                setActiveSessionId(undefined)
                                navigate({
                                    to: "/dashboard/organisations/$idOrganization/agent",
                                    params: { idOrganization: idOrganization },
                                })
                            }}
                        >
                            <ButtonGhostContent
                                leftIcon={<IconPlus />}
                            />
                        </Button>
                    </div>
                    <div className={css({ flex: 1, overflowY: "auto", minHeight: 0, padding: "1rem" })}>
                        <AgentSessionList idOrganization={idOrganization} />
                    </div>
                </div>

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
                    <Outlet />
                </div>
            </div>
        </AgentActiveSessionContext.Provider>
    )
}
