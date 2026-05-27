import { readOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent } from "@arrhes/ui"
import { IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../components/layouts/DataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../components/layouts/settingsSection/settingsSection.tsx"
import { DeleteOneOrganization } from "./DeleteOneOrganization.tsx"

export function OrganizationSecurityPage({ idOrganization: idOrganizationProp }: { idOrganization?: string } = {}) {
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
                            <SettingsSection.Root variant="danger">
                                <SettingsSection.Header
                                    title="Zone de danger"
                                    variant="danger"
                                />
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
