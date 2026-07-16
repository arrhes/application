import { readOneYearRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent } from "@arrhes/ui"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Block } from "../../../../components/layouts/block/block.tsx"
import { DataWrapper } from "../../../../components/layouts/DataWrapper.tsx"
import { PageRoot } from "../../../../components/layouts/page/PageRoot.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { DeleteOneYear } from "./DeleteOneYear.tsx"
import { UpdateOneYear } from "./UpdateOneYear.tsx"

export function YearSettingsPage({
    idOrganization: idOrganizationProp,
    idYear: idYearProp,
}: {
    idOrganization?: string
    idYear?: string
} = {}) {
    const params = useParams({
        strict: false,
    }) as {
        idOrganization?: string
        idYear?: string
    }
    const idOrganization = idOrganizationProp ?? params.idOrganization ?? ""
    const idYear = idYearProp ?? params.idYear ?? ""
    void idOrganization

    return (
                <DataWrapper
                    routeDefinition={readOneYearRouteDefinition}
                    body={{
                        idYear: idYear,
                    }}
                >
                    {(year) => {
                        return (
                            <>
                                <Block.Root>
                                    <Block.Header title="Informations générales" />
                                    <Block.Row
                                        title="Modifier l'exercice"
                                        description="Mettez à jour les informations principales."
                                    >
                                        <UpdateOneYear year={year}>
                                            <ButtonOutlineContent
                                                leftIcon={<IconPencil />}
                                                text="Modifier"
                                            />
                                        </UpdateOneYear>
                                    </Block.Row>
                                </Block.Root>
                                <Block.Root variant="danger">
                                    <Block.Header
                                        title="Zone de danger"
                                        variant="danger"
                                    />
                                    <Block.Row
                                        title="Supprimer l'exercice"
                                        description="Cette action est irréversible."
                                        variant="danger"
                                    >
                                        <DeleteOneYear year={year}>
                                            <ButtonOutlineContent
                                                leftIcon={<IconTrash />}
                                                text="Supprimer"
                                                color="danger"
                                            />
                                        </DeleteOneYear>
                                    </Block.Row>
                                </Block.Root>
                            </>
                        )
                    }}
                </DataWrapper>
    )
}
