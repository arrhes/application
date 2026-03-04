import { readOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent } from "@arrhes/ui"
import { IconPencil } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../../components/layouts/settingsSection/settingsSection.tsx"
import { organizationSettingsRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSettings/organizationSettingsRoute.tsx"
import { UpdateOneOrganization } from "./updateOneOrganization.tsx"

export function OrganizationSettingsPage() {
    const _params = useParams({ from: organizationSettingsRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper routeDefinition={readOneOrganizationRouteDefinition} body={{}}>
                    {(organization) => {
                        return (
                            <SettingsSection.Root>
                                <SettingsSection.Header title="Informations générales" />
                                <SettingsSection.Row
                                    title="Modifier les informations de l'organisation"
                                    description="Changez le nom, l'email ou encore le numéro de SIREN."
                                >
                                    <UpdateOneOrganization organization={organization}>
                                        <ButtonOutlineContent leftIcon={<IconPencil />} text="Modifier" />
                                    </UpdateOneOrganization>
                                </SettingsSection.Row>
                            </SettingsSection.Root>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
