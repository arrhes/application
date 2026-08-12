import { ButtonOutlineContent } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import { IconBuildingPlus } from "@tabler/icons-react"
import { Page } from "../../../components/layouts/page/page.tsx"
import { AddNewOrganization } from "./AddNewOrganization.tsx"
import { OrganizationsListTable } from "./OrganizationsListTable.tsx"

export function OrganizationsPage() {
    return (
        <Page.Root>
            {/* <Page.Header>
                <Page.Title>
                    Mes organisations
                </Page.Title>
            </Page.Header> */}
            <Page.Content>
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                    })}
                >
                    <AddNewOrganization>
                        <ButtonOutlineContent
                            leftIcon={<IconBuildingPlus />}
                            text="Créer une organisation"
                        />
                    </AddNewOrganization>
                </div>
                <OrganizationsListTable />
            </Page.Content>
        </Page.Root>
    )
}
