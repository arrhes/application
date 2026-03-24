import { readAllTagsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { schemas } from "@arrhes/application-metadata/schemas"
import { IconTag } from "@tabler/icons-react"
import type * as v from "valibot"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../../../components/layouts/emptyState.tsx"
import { ListTable } from "../../../../../components/layouts/listTable/listTable.tsx"
import { TagListTableRow } from "./tagListTableRow.tsx"

export function TagsListTable(props: {
    idOrganization: v.InferOutput<typeof schemas.organization>["id"]
    idYear: v.InferOutput<typeof schemas.year>["id"]
}) {
    return (
        <ListTable.Root>
            <DataWrapper
                routeDefinition={readAllTagsRouteDefinition}
                body={{
                    idYear: props.idYear,
                }}
            >
                {(tags) => {
                    const sortedTags = tags.sort((a, b) => a.createdAt.localeCompare(b.createdAt))

                    if (sortedTags.length === 0) {
                        return (
                            <EmptyState
                                icon={<IconTag size={48} />}
                                title="Aucune catégorie"
                                subtitle="Ajoutez une catégorie pour commencer"
                            />
                        )
                    }
                    return sortedTags.map((tag) => <TagListTableRow key={tag.id} tag={tag} />)
                }}
            </DataWrapper>
        </ListTable.Root>
    )
}
