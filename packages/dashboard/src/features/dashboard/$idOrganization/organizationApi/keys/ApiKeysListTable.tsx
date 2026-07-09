import { readAllApiKeysRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconKey } from "@tabler/icons-react"
import type * as v from "valibot"
import { DataWrapper } from "../../../../../components/layouts/DataWrapper.tsx"
import { EmptyState } from "../../../../../components/layouts/EmptyState.tsx"
import { ListTable } from "../../../../../components/layouts/listTable/listTable.tsx"
import { ApiKeyListTableRow } from "./ApiKeyListTableRow.tsx"

export function ApiKeysListTable(props: { idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"] }) {
    return (
        <ListTable.Root>
            <DataWrapper
                routeDefinition={readAllApiKeysRouteDefinition}
                body={{}}
                params={{
                    idOrganization: props.idOrganization,
                }}
            >
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
                    return apiKeys.map((apiKey) => (
                        <ApiKeyListTableRow
                            key={apiKey.id}
                            apiKey={apiKey}
                            idOrganization={props.idOrganization}
                        />
                    ))
                }}
            </DataWrapper>
        </ListTable.Root>
    )
}
