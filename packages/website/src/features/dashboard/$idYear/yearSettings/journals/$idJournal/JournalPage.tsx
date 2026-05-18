import { readOneJournalRouteDefinition } from "@arrhes/application-metadata/routes"
import { FormatText } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../../components/layouts/DataWrapper.tsx"
import { DataBlock } from "../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"

export function JournalPage() {
    const params = useParams({
        strict: false,
    }) as {
        idYear: string
        idJournal: string
    }

    return (
        <DataWrapper
            routeDefinition={readOneJournalRouteDefinition}
            body={{
                idYear: params.idYear,
                idJournal: params.idJournal,
            }}
        >
            {(journal) => {
                return (
                    <Section.Item
                        className={css({
                            flexDirection: "column",
                        })}
                    >
                        <DataBlock.Root>
                            <DataBlock.Header title="Informations" />
                            <DataBlock.Content>
                                <DataBlock.Item label="Code">
                                    <FormatText>{journal.code}</FormatText>
                                </DataBlock.Item>
                                <DataBlock.Item label="Libellé">
                                    <FormatText>{journal.label}</FormatText>
                                </DataBlock.Item>
                            </DataBlock.Content>
                        </DataBlock.Root>
                    </Section.Item>
                )
            }}
        </DataWrapper>
    )
}
