import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconUserPlus } from "@tabler/icons-react"
import { CreateOneOrganizationUser } from "./CreateOneOrganizationUser.tsx"
import { OrganizationUsersListTable } from "./OrganizationUsersListTable.tsx"

export function OrganizationUsersPage({ idOrganization }: { idOrganization: string }) {
    return (
        <>
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                })}
            >
                <CreateOneOrganizationUser idOrganization={idOrganization}>
                    <ButtonOutlineContent
                        leftIcon={<IconUserPlus />}
                        text="Inviter un collaborateur"
                    />
                </CreateOneOrganizationUser>
            </div>
            <OrganizationUsersListTable idOrganization={idOrganization} />
        </>
    )
}
