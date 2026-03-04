import { readAllOrganizationUsersRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconUsers } from "@tabler/icons-react"
import type * as v from "valibot"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../../../components/layouts/emptyState.tsx"
import { ListTable } from "../../../../../components/layouts/listTable/listTable.tsx"
import { OrganizationUserListTableRow } from "./organizationUserListTableRow.tsx"

export function OrganizationUsersListTable(_props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
}) {
    return (
        <ListTable.Root>
            <DataWrapper routeDefinition={readAllOrganizationUsersRouteDefinition} body={{}}>
                {(organizationUsers) => {
                    if (organizationUsers.length === 0) {
                        return (
                            <EmptyState
                                icon={<IconUsers size={48} />}
                                title="Aucun utilisateur"
                                subtitle="Invitez un utilisateur pour commencer"
                            />
                        )
                    }
                    return organizationUsers.map((organizationUser) => (
                        <OrganizationUserListTableRow key={organizationUser.id} organizationUser={organizationUser} />
                    ))
                }}
            </DataWrapper>
        </ListTable.Root>
    )
}
