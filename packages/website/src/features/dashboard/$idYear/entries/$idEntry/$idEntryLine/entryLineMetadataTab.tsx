import { readOneEntryLineRouteDefinition } from "@arrhes/application-metadata/routes"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { FormatDateTime } from "../../../../../../components/formats/formatDateTime.tsx"
import { FormatText } from "../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"
import { entryLineLayoutRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/entries/$idEntry/$idEntryLine/entryLineLayoutRoute.tsx"

export function EntryLineMetadataTab() {
    const params = useParams({ from: entryLineLayoutRoute.id })

    return (
        <DataWrapper
            routeDefinition={readOneEntryLineRouteDefinition}
            body={{
                idYear: params.idYear,
                idEntryLine: params.idEntryLine,
            }}
        >
            {(entryLine) => {
                return (
                    <Section.Item className={css({ flexDirection: "column" })}>
                        <DataBlock.Root>
                            <DataBlock.Header title="Métadonnées" />
                            <DataBlock.Content>
                                <DataBlock.Item label="Ajouté le">
                                    <FormatDateTime date={entryLine.createdAt} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Modifié le">
                                    <FormatDateTime date={entryLine.lastUpdatedAt} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Id">
                                    <FormatText>{entryLine.id}</FormatText>
                                </DataBlock.Item>
                            </DataBlock.Content>
                        </DataBlock.Root>
                    </Section.Item>
                )
            }}
        </DataWrapper>
    )
}
