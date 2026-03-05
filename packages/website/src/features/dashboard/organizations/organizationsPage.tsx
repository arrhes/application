import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBuildingPlus } from "@tabler/icons-react"
import { Page } from "../../../components/layouts/page/page.tsx"
import { AddNewOrganization } from "./addNewOrganization.tsx"
import { OrganizationsListTable } from "./organizationsListTable.tsx"

export function OrganizationsPage() {
    return (
        <Page.Root>
            {/* <Page.Header>
                <Page.Title>
                    Mes organisations
                </Page.Title>
            </Page.Header> */}
            <Page.Content>
                <div className={css({ width: "100%", display: "flex", justifyContent: "end", alignItems: "center" })}>
                    <AddNewOrganization>
                        <ButtonOutlineContent leftIcon={<IconBuildingPlus />} text="Créer une organisation" />
                    </AddNewOrganization>
                </div>
                <OrganizationsListTable />
            </Page.Content>
        </Page.Root>
    )
}
