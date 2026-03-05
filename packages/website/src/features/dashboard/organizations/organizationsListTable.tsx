import { getAllMyOrganizationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconBuilding } from "@tabler/icons-react"
import { DataWrapper } from "../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../components/layouts/emptyState.tsx"
import { ListTable } from "../../../components/layouts/listTable/listTable.tsx"
import { OrganizationListTableRow } from "./organizationListTableRow.tsx"

export function OrganizationsListTable() {
    return (
        <ListTable.Root>
            <DataWrapper routeDefinition={getAllMyOrganizationsRouteDefinition} body={{}}>
                {(organizationUsers) => {
                    if (organizationUsers.length === 0) {
                        return (
                            <EmptyState
                                icon={<IconBuilding size={48} />}
                                title="Aucune organisation"
                                subtitle="Créez une organisation pour commencer"
                            />
                        )
                    }
                    return organizationUsers.map((organizationUser) => (
                        <OrganizationListTableRow key={organizationUser.id} organizationUser={organizationUser} />
                    ))
                }}
            </DataWrapper>
        </ListTable.Root>
    )
}
