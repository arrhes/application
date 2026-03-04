import { readOneYearRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent } from "@arrhes/ui"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { PageRoot } from "../../../../components/layouts/page/pageRoot.tsx"
import { SettingsSection } from "../../../../components/layouts/settingsSection/settingsSection.tsx"
import { yearSettingsRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsRoute.tsx"
import { DeleteOneYear } from "./deleteOneYear.tsx"
import { UpdateOneYear } from "./updateOneYear.tsx"

export function YearSettingsPage() {
    const params = useParams({ from: yearSettingsRoute.id })

    return (
        <PageRoot>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOneYearRouteDefinition}
                    body={{
                        idYear: params.idYear,
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
                                            <ButtonOutlineContent leftIcon={<IconPencil />} text="Modifier" />
                                        </UpdateOneYear>
                                    </SettingsSection.Row>
                                </SettingsSection.Root>
                                <SettingsSection.Root variant="danger">
                                    <SettingsSection.Header title="Zone de danger" variant="danger" />
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
