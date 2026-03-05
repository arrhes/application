import { readAllJournalsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { schemas } from "@arrhes/application-metadata/schemas"
import { IconBook } from "@tabler/icons-react"
import type * as v from "valibot"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../../../components/layouts/emptyState.tsx"
import { ListTable } from "../../../../../components/layouts/listTable/listTable.tsx"
import { JournalListTableRow } from "./journalListTableRow.tsx"

export function JournalsListTable(props: {
    idOrganization: v.InferOutput<typeof schemas.organization>["id"]
    idYear: v.InferOutput<typeof schemas.year>["id"]
}) {
    return (
        <ListTable.Root>
            <DataWrapper
                routeDefinition={readAllJournalsRouteDefinition}
                body={{
                    idYear: props.idYear,
                }}
            >
                {(journals) => {
                    const sortedJournals = journals.sort((a, b) => a.createdAt.localeCompare(b.createdAt))

                    if (sortedJournals.length === 0) {
                        return (
                            <EmptyState
                                icon={<IconBook size={48} />}
                                title="Aucun journal"
                                subtitle="Créez un journal pour commencer"
                            />
                        )
                    }
                    return sortedJournals.map((journal) => <JournalListTableRow key={journal.id} journal={journal} />)
                }}
            </DataWrapper>
        </ListTable.Root>
    )
}
