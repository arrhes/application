import { getAllMyOrganizationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent, FormatNull } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBuildings, IconChevronRight } from "@tabler/icons-react"
import { useNavigate } from "@tanstack/react-router"
import { Page } from "../../../components/layouts/page/page.tsx"
import { useDataFromAPI } from "../../../utilities/useHTTPData.ts"

export function AgentSelectOrganization() {
    const navigate = useNavigate()

    const organizations = useDataFromAPI({
        routeDefinition: getAllMyOrganizationsRouteDefinition,
        body: {},
    })

    const organizationUsers = organizations.data ?? []

    return (
        <Page.Root>
            <Page.Content>
                <Page.Header>
                    <Page.Title>Assistant comptable</Page.Title>
                    <Page.Description>Sélectionnez une organisation pour accéder à l'assistant.</Page.Description>
                </Page.Header>

                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    })}
                >
                    {organizationUsers.map((organizationUser) => (
                        <Button
                            key={organizationUser.organization.id}
                            onClick={() => {
                                navigate({
                                    to: "/dashboard/agent/$idOrganization",
                                    params: { idOrganization: organizationUser.organization.id },
                                })
                            }}
                            className={css({
                                width: "100%",
                            })}
                        >
                            <ButtonOutlineContent
                                leftIcon={<IconBuildings />}
                                text={organizationUser.organization.name}
                                rightIcon={<IconChevronRight />}
                                className={css({
                                    width: "100%",
                                    padding: "1rem",
                                    justifyContent: "start",
                                })}
                            />
                        </Button>
                    ))}

                    {organizationUsers.length === 0 && (
                        <FormatNull
                            text="Aucune organisation disponible."
                        />
                    )}
                </div>
            </Page.Content>
        </Page.Root>
    )
}
