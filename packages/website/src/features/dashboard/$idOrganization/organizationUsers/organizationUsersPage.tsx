import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconUserPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { organizationUsersRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationUsers/organizationUsersRoute.tsx"
import { CreateOneOrganizationUser } from "./createOneOrganizationUser.tsx"
import { OrganizationUsersListTable } from "./organizationUsersListTable.tsx"

export function OrganizationUsersPage() {
    const params = useParams({ from: organizationUsersRoute.id })

    return (
        <Page.Root>
            {/* <Page.Header>
                <Page.Title>
                    Membres
                </Page.Title>
            </Page.Header> */}
            <Page.Content>
                <div className={css({ width: "100%", display: "flex", justifyContent: "end", alignItems: "center" })}>
                    <CreateOneOrganizationUser idOrganization={params.idOrganization}>
                        <ButtonOutlineContent leftIcon={<IconUserPlus />} text="Invitez un utilisateur" />
                    </CreateOneOrganizationUser>
                </div>
                <OrganizationUsersListTable idOrganization={params.idOrganization} />
            </Page.Content>
        </Page.Root>
    )
}
