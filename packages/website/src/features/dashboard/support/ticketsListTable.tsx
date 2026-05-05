import { readAllTicketsRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconTicket } from "@tabler/icons-react"
import { DataWrapper } from "../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../components/layouts/emptyState.tsx"
import { ListTable } from "../../../components/layouts/listTable/listTable.tsx"
import { TicketListTableRow } from "./ticketListTableRow.tsx"

export function TicketsListTable() {
    return (
        <ListTable.Root>
            <DataWrapper routeDefinition={readAllTicketsRouteDefinition} body={{}}>
                {(tickets) => {
                    const sortedTickets = tickets.sort((a, b) => b.createdAt.localeCompare(a.createdAt))

                    if (sortedTickets.length === 0) {
                        return (
                            <EmptyState
                                icon={<IconTicket size={48} />}
                                title="Aucun ticket"
                                subtitle="Créez un ticket pour contacter le support"
                            />
                        )
                    }
                    return sortedTickets.map((ticket) => <TicketListTableRow key={ticket.id} ticket={ticket} />)
                }}
            </DataWrapper>
        </ListTable.Root>
    )
}
