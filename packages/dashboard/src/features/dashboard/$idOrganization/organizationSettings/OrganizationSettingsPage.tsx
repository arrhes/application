import { readOneOrganizationRouteDefinition } from "@comptasse/application-metadata/routes"
import { ButtonOutlineContent } from "@comptasse/ui"
import { IconPencil } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Block } from "../../../../components/layouts/block/block.tsx"
import { DataWrapper } from "../../../../components/layouts/DataWrapper.tsx"
import { UpdateOneOrganization } from "./UpdateOneOrganization.tsx"

export function OrganizationSettingsPage({ idOrganization: idOrganizationProp }: { idOrganization?: string } = {}) {
    const params = useParams({
        strict: false,
    }) as {
        idOrganization?: string
    }
    const idOrganization = idOrganizationProp ?? params.idOrganization ?? ""

    return (
        <DataWrapper
            routeDefinition={readOneOrganizationRouteDefinition}
            body={{
                idOrganization,
            }}
        >
            {(organization) => {
                return (
                    <Block.Root>
                        <Block.Header title="Informations générales" />
                        <Block.Row
                            title="Modifier les informations de l'organisation"
                            description="Changez le nom, l'email ou encore le numéro de SIREN."
                        >
                            <UpdateOneOrganization organization={organization}>
                                <ButtonOutlineContent
                                    leftIcon={<IconPencil />}
                                    text="Modifier"
                                />
                            </UpdateOneOrganization>
                        </Block.Row>
                    </Block.Root>
                )
            }}
        </DataWrapper>
    )
}
