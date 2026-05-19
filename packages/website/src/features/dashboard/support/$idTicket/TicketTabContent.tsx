import { readOneTicketRouteDefinition } from "@arrhes/application-metadata/routes"
import { css } from "@arrhes/ui/utilities/cn.js"
import { DataWrapper } from "../../../../components/layouts/DataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../components/layouts/section/section.tsx"
import { StatusToggle } from "./StatusToggle.tsx"
import { TicketPage } from "./TicketPage.tsx"

export function TicketTabContent(props: { idTicket: string }) {
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
                                idTicket: props.idTicket,
                            }}
                        >
                            {(ticket) => (
                                <div
                                    className={css({
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    })}
                                >
                                    <StatusToggle
                                        idTicket={props.idTicket}
                                        currentStatus={ticket.status}
                                    />
                                </div>
                            )}
                        </DataWrapper>
                    </Section.Item>
                </Section.Root>
                <TicketPage idTicket={props.idTicket} />
            </Page.Content>
        </Page.Root>
    )
}
