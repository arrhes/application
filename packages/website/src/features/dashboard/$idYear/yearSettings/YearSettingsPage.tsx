import { readOneYearRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent } from "@arrhes/ui"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../components/layouts/DataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { PageRoot } from "../../../../components/layouts/page/PageRoot.tsx"
import { SettingsSection } from "../../../../components/layouts/settingsSection/settingsSection.tsx"
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
        <PageRoot>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOneYearRouteDefinition}
                    body={{
                        idYear: idYear,
                    }}
                >
                    {(year) => {
                        return (
                            <>
                                <SettingsSection.Root>
                                    <SettingsSection.Header title="Informations générales" />
                                    <SettingsSection.Row
                                        title="Modifier l'exercice"
                                        description="Mettez à jour les informations principales."
                                    >
                                        <UpdateOneYear year={year}>
                                            <ButtonOutlineContent
                                                leftIcon={<IconPencil />}
                                                text="Modifier"
                                            />
                                        </UpdateOneYear>
                                    </SettingsSection.Row>
                                </SettingsSection.Root>
                                <SettingsSection.Root variant="danger">
                                    <SettingsSection.Header
                                        title="Zone de danger"
                                        variant="danger"
                                    />
                                    <SettingsSection.Row
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
                                    </SettingsSection.Row>
                                </SettingsSection.Root>
                            </>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </PageRoot>
    )
}
