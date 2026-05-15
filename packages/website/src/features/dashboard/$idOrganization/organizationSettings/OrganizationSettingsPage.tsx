import { readOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent } from "@arrhes/ui"
import { IconPencil } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../components/layouts/DataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../components/layouts/settingsSection/settingsSection.tsx"
import { UpdateOneOrganization } from "./UpdateOneOrganization.tsx"

export function OrganizationSettingsPage({ idOrganization: idOrganizationProp }: { idOrganization?: string } = {}) {
    const params = useParams({
        strict: false,
    }) as {
        idOrganization?: string
    }
    const idOrganization = idOrganizationProp ?? params.idOrganization ?? ""

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOneOrganizationRouteDefinition}
                    body={{
                        idOrganization,
                    }}
                >
                    {(organization) => {
                        return (
                            <SettingsSection.Root>
                                <SettingsSection.Header title="Informations générales" />
                                <SettingsSection.Row
                                    title="Modifier les informations de l'organisation"
                                    description="Changez le nom, l'email ou encore le numéro de SIREN."
                                >
                                    <UpdateOneOrganization organization={organization}>
                                        <ButtonOutlineContent
                                            leftIcon={<IconPencil />}
                                            text="Modifier"
                                        />
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
