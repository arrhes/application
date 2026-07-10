import { readOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent } from "@arrhes/ui"
import { IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Block } from "../../../../components/layouts/block/block.tsx"
import { DataWrapper } from "../../../../components/layouts/DataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
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
                            <Block.Root variant="danger">
                                <Block.Header
                                    title="Zone de danger"
                                    variant="danger"
                                />
                                <Block.Row
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
                                </Block.Row>
                            </Block.Root>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
