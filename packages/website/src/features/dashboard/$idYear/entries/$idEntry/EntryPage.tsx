import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonPlainContent, FormatDate, FormatNull, FormatPrice, FormatText, LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil } from "@tabler/icons-react"
import type * as v from "valibot"
import { DataBlock } from "../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { useTabs } from "../../../../../contexts/tabs/useTabs.tsx"
import { UpdateOneEntry } from "./UpdateOneEntry.tsx"

export type EntryPageData = {
    entry: v.InferOutput<typeof returnedSchemas.entry>
    journal: v.InferOutput<typeof returnedSchemas.journal> | null
    entryTagLabels: string[]
    file: v.InferOutput<typeof returnedSchemas.file> | null
    totalDebit: number
    totalCredit: number
}

// Used by the tab system — receives pre-resolved data from EntryTabContent's YearDataWrapper.
export function EntryPage(props: EntryPageData) {
    const { openTab } = useTabs()

    return (
        <EntryInformationsTab
            entry={props.entry}
            journal={props.journal}
            entryTagLabels={props.entryTagLabels}
            file={props.file}
            totalDebit={props.totalDebit}
            totalCredit={props.totalCredit}
            onFileClick={(idOrganization, idFile) =>
                openTab({
                    component: "fichier",
                    props: {
                        idOrganization,
                        idFile,
                    },
                })
            }
        />
    )
}

function EntryInformationsTab(props: {
    entry: v.InferOutput<typeof returnedSchemas.entry>
    journal: v.InferOutput<typeof returnedSchemas.journal> | null
    entryTagLabels: string[]
    file: v.InferOutput<typeof returnedSchemas.file> | null
    totalDebit: number
    totalCredit: number
    onFileClick: (idOrganization: string, idFile: string) => void
}) {
    return (
        <Section.Item
            className={css({
                flexDirection: "column",
            })}
        >
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    gap: "0.5rem",
                })}
            >
                <UpdateOneEntry entry={props.entry}>
                    <ButtonPlainContent
                        leftIcon={<IconPencil />}
                        text="Modifier"
                    />
                </UpdateOneEntry>
            </div>
            <DataBlock.Root>
                <DataBlock.Header title="Informations" />
                <DataBlock.Content>
                    <DataBlock.Item label="Libellé">
                        <FormatText>{props.entry.label}</FormatText>
                    </DataBlock.Item>
                    <DataBlock.Item label="Date">
                        <FormatDate date={props.entry.date} />
                    </DataBlock.Item>
                    <DataBlock.Item label="Journal">
                        {props.entry.idJournal === null ? (
                            <FormatNull />
                        ) : props.journal !== null ? (
                            <FormatText>{`(${props.journal.code}) ${props.journal.label}`}</FormatText>
                        ) : (
                            <FormatNull />
                        )}
                    </DataBlock.Item>
                    <DataBlock.Item label="Pièce justificative">
                        {props.entry.idFile === null || props.file === null ? (
                            <FormatNull />
                        ) : (
                            <Button onClick={() => props.onFileClick(props.entry.idOrganization, props.file!.id)}>
                                <LinkContent>{props.file.name}</LinkContent>
                            </Button>
                        )}
                    </DataBlock.Item>
                </DataBlock.Content>
            </DataBlock.Root>
            <DataBlock.Root>
                <DataBlock.Header title="Détail" />
                <DataBlock.Content>
                    <DataBlock.Item label="Total débit">
                        <FormatPrice price={props.totalDebit} />
                    </DataBlock.Item>
                    <DataBlock.Item label="Total crédit">
                        <FormatPrice price={props.totalCredit} />
                    </DataBlock.Item>
                </DataBlock.Content>
            </DataBlock.Root>
        </Section.Item>
    )
}
