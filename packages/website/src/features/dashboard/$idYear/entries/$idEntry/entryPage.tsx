import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonPlainContent, FormatDate, FormatNull, FormatPrice, FormatText, LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import type * as v from "valibot"
import { DataBlock } from "../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { useTabs } from "../../../../../contexts/tabs/tabsContext.tsx"
import type { YearDataKey } from "../../yearDataWrapper.tsx"
import { YearDataWrapper } from "../../yearDataWrapper.tsx"
import { UpdateOneEntry } from "./updateOneEntry.tsx"

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

const routeRequiredKeys = [
    "entries",
    "entryLines",
    "entryTags",
    "journals",
    "tags",
    "files",
] as const satisfies readonly YearDataKey[]

// Used by TanStack Router as a standalone route component — resolves data itself via YearDataWrapper.
export function EntryRoutePage() {
    const params = useParams({ strict: false }) as { idYear?: string; idEntry?: string }
    const idYear = params.idYear ?? ""
    const idEntry = params.idEntry ?? ""
    const { openTab } = useTabs()

    return (
        <YearDataWrapper
            idYear={idYear}
            requiredKeys={routeRequiredKeys}
        >
            {({ entries, entryLines: allEntryLines, entryTags, journals, tags, files }) => {
                const entry = entries.find((r) => r.id === idEntry)
                if (entry === undefined) return null

                const entryLines = allEntryLines.filter((row) => row.idEntry === idEntry)
                const journal =
                    entry.idJournal !== null ? (journals.find((j) => j.id === entry.idJournal) ?? null) : null
                const entryTagIds = entryTags.filter((et) => et.idEntry === entry.id).map((et) => et.idTag)
                const entryTagLabels = entryTagIds
                    .map((id) => tags.find((t) => t.id === id))
                    .filter((t): t is NonNullable<typeof t> => Boolean(t))
                    .map((t) => t.label)
                const file = entry.idFile !== null ? (files.find((f) => f.id === entry.idFile) ?? null) : null

                let totalDebit = 0
                let totalCredit = 0
                for (const entryLine of entryLines) {
                    totalDebit += Number(entryLine.debit)
                    totalCredit += Number(entryLine.credit)
                }

                return (
                    <EntryInformationsTab
                        entry={entry}
                        journal={journal}
                        entryTagLabels={entryTagLabels}
                        file={file}
                        totalDebit={totalDebit}
                        totalCredit={totalCredit}
                        onFileClick={(idOrganization, idFile) =>
                            openTab({
                                component: "fichier",
                                props: { idOrganization, idFile },
                            })
                        }
                    />
                )
            }}
        </YearDataWrapper>
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
