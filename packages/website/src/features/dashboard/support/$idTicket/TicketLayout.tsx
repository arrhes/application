import { readOneTicketRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft } from "@tabler/icons-react"
import { Outlet, useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../components/layouts/DataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../components/layouts/section/section.tsx"
import { LinkButton } from "../../../../components/LinkButton.tsx"

import { StatusToggle } from "./StatusToggle.tsx"

export function TicketLayout() {
    const params = useParams({
        strict: false,
    }) as { idTicket?: string }

    return (
        <Page.Root>
            <Page.Content>
                <Section.Root>
                    <Section.Item
                        className={css({
                            flexDirection: "row",
                        })}
                    >
                        <DataWrapper
                            routeDefinition={readOneTicketRouteDefinition}
                            body={{
                                idTicket: params.idTicket,
                            }}
                        >
                            {(ticket) => {
                                return (
                                    <div
                                        className={css({
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                        })}
                                    >
                                        <LinkButton
                                            to="/dashboard/support"
                                            params={{}}
                                        >
                                            <ButtonOutlineContent
                                                leftIcon={<IconChevronLeft />}
                                                text="Retour"
                                            />
                                        </LinkButton>
                                        <StatusToggle
                                            idTicket={params.idTicket}
                                            currentStatus={ticket.status}
                                        />
                                    </div>
                                )
                            }}
                        </DataWrapper>
                    </Section.Item>
                </Section.Root>
                <Outlet />
            </Page.Content>
        </Page.Root>
    )
}
