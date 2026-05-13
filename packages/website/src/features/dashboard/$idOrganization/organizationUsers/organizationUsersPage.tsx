import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconUserPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { CreateOneOrganizationUser } from "./createOneOrganizationUser.tsx"
import { OrganizationUsersListTable } from "./organizationUsersListTable.tsx"

export function OrganizationUsersPage({ idOrganization: idOrganizationProp }: { idOrganization?: string }) {
    const params = useParams({
        strict: false,
    }) as {
        idOrganization?: string
    }
    const idOrganization = idOrganizationProp ?? params.idOrganization ?? ""

    return (
        <Page.Root>
            {/* <Page.Header>
                <Page.Title>
                    Membres
                </Page.Title>
            </Page.Header> */}
            <Page.Content>
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        justifyContent: "end",
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
            </Page.Content>
        </Page.Root>
    )
}
