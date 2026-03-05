import { readAllApiKeysRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconKey } from "@tabler/icons-react"
import type * as v from "valibot"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../../../components/layouts/emptyState.tsx"
import { ListTable } from "../../../../../components/layouts/listTable/listTable.tsx"
import { ApiKeyListTableRow } from "./apiKeyListTableRow.tsx"

export function ApiKeysListTable(_props: { idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"] }) {
    return (
        <ListTable.Root>
            <DataWrapper routeDefinition={readAllApiKeysRouteDefinition} body={{}}>
                {(apiKeys) => {
                    if (apiKeys.length === 0) {
                        return (
                            <EmptyState
                                icon={<IconKey size={48} />}
                                title="Aucune clé API"
                                subtitle="Créez une clé API pour commencer"
                            />
                        )
                    }
                    return apiKeys.map((apiKey) => <ApiKeyListTableRow key={apiKey.id} apiKey={apiKey} />)
                }}
            </DataWrapper>
        </ListTable.Root>
    )
}
