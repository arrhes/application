import { readAllRecordLabelsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { schemas } from "@arrhes/application-metadata/schemas"
import { IconTag } from "@tabler/icons-react"
import type * as v from "valibot"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../../../components/layouts/emptyState.tsx"
import { ListTable } from "../../../../../components/layouts/listTable/listTable.tsx"
import { RecordLabelListTableRow } from "./recordLabelListTableRow.tsx"

export function RecordLabelsListTable(props: {
    idOrganization: v.InferOutput<typeof schemas.organization>["id"]
    idYear: v.InferOutput<typeof schemas.year>["id"]
}) {
    return (
        <ListTable.Root>
            <DataWrapper
                routeDefinition={readAllRecordLabelsRouteDefinition}
                body={{
                    idYear: props.idYear,
                }}
            >
                {(recordLabels) => {
                    const sortedRecordLabels = recordLabels.sort((a, b) => a.createdAt.localeCompare(b.createdAt))

                    if (sortedRecordLabels.length === 0) {
                        return (
                            <EmptyState
                                icon={<IconTag size={48} />}
                                title="Aucune catégorie"
                                subtitle="Ajoutez une catégorie pour commencer"
                            />
                        )
                    }
                    return sortedRecordLabels.map((recordLabel) => (
                        <RecordLabelListTableRow key={recordLabel.id} recordLabel={recordLabel} />
                    ))
                }}
            </DataWrapper>
        </ListTable.Root>
    )
}
