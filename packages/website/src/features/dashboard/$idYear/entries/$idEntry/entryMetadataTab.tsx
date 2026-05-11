import { FormatDateTime, FormatText } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { DataBlock } from "../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { entryLayoutRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/entries/$idEntry/entryLayoutRoute.tsx"
import type { YearDataKey } from "../../yearDataWrapper.tsx"
import { YearDataWrapper } from "../../yearDataWrapper.tsx"

const requiredKeys = [
    "entries",
] as const satisfies readonly YearDataKey[]

export function EntryMetadataTab() {
    const params = useParams({
        from: entryLayoutRoute.id,
    })

    return (
        <YearDataWrapper
            idYear={params.idYear}
            requiredKeys={requiredKeys}
        >
            {({ entries }) => {
                const entry = entries.find((r) => r.id === params.idEntry)
                if (entry === undefined) return null

                return (
                    <Section.Item
                        className={css({
                            flexDirection: "column",
                        })}
                    >
                        <DataBlock.Root>
                            <DataBlock.Header title="Métadonnées" />
                            <DataBlock.Content>
                                <DataBlock.Item label="Ajoutée le">
                                    <FormatDateTime date={entry.createdAt} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Modifiée le">
                                    <FormatDateTime date={entry.lastUpdatedAt} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Id">
                                    <FormatText>{entry.id}</FormatText>
                                </DataBlock.Item>
                            </DataBlock.Content>
                        </DataBlock.Root>
                    </Section.Item>
                )
            }}
        </YearDataWrapper>
    )
}
