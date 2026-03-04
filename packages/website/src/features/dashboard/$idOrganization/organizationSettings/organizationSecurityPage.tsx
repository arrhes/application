import { readOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent } from "@arrhes/ui"
import { IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../components/layouts/settingsSection/settingsSection.tsx"
import { organizationSecurityRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationSettings/organizationSecurityRoute.tsx"
import { DeleteOneOrganization } from "./deleteOneOrganization.tsx"

export function OrganizationSecurityPage() {
    const _params = useParams({ from: organizationSecurityRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper routeDefinition={readOneOrganizationRouteDefinition} body={{}}>
                    {(organization) => {
                        return (
                            <SettingsSection.Root variant="danger">
                                <SettingsSection.Header title="Zone de danger" variant="danger" />
                                <SettingsSection.Row
                                    title="Supprimer l'organisation"
                                    description="Cette action est irréversible."
                                    variant="danger"
                                >
                                    <DeleteOneOrganization idOrganization={organization.id}>
                                        <ButtonOutlineContent
                                            leftIcon={<IconTrash />}
                                            text="Supprimer"
                                            color="danger"
                                        />
                                    </DeleteOneOrganization>
                                </SettingsSection.Row>
                            </SettingsSection.Root>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
