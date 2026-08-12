import { css } from "@comptasse/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { Box } from "../../../../../components/layouts/Box.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import type { YearDataKey } from "../../YearDataWrapper.tsx"
import { YearDataWrapper } from "../../YearDataWrapper.tsx"
import { ReportFilterPopover } from "../ReportFilterPopover.tsx"
import { BalanceReportTable } from "./BalanceReportTable.tsx"

const requiredKeys = [
    "accounts",
    "entries",
    "entryLines",
    "journals",
    "tags",
    "entryTags",
] as const satisfies readonly YearDataKey[]

export function BalanceReportPage({ idYear: idYearProp }: { idYear?: string } = {}) {
    const params = useParams({
        strict: false,
    }) as {
        idYear?: string
    }
    const idYear = idYearProp ?? params.idYear ?? ""
    const [selectedJournalId, setSelectedJournalId] = useState<string | null>(null)
    const [selectedTags, setSelectedTags] = useState<
        Array<{
            key: string
            label: string
        }>
    >([])

    return (
        <YearDataWrapper
            idYear={idYear}
            requiredKeys={requiredKeys}
        >
            {({ accounts, entries, entryLines, journals, tags, entryTags }) => {
                let filteredEntryLines = entryLines.filter((entryLine) => entryLine.isComputedForBalanceReport === true)
                const filteredAccounts = accounts

                const journalOptions = journals.map((j) => ({
                    key: j.id,
                    label: `${j.code} ${j.label ?? ""}`.trim(),
                }))

                const tagOptions = tags.map((t) => ({
                    key: t.id,
                    label: t.label,
                }))

                if (selectedJournalId) {
                    const matchingEntryIds = new Set<string>()
                    for (const entry of entries) {
                        if (entry.idJournal === selectedJournalId) {
                            matchingEntryIds.add(entry.id)
                        }
                    }
                    filteredEntryLines = filteredEntryLines.filter((el) => matchingEntryIds.has(el.idEntry))
                }

                if (selectedTags.length > 0) {
                    const selectedTagIds = new Set(selectedTags.map((t) => t.key))
                    const matchingEntryIds = new Set<string>()
                    for (const et of entryTags) {
                        if (selectedTagIds.has(et.idTag)) {
                            matchingEntryIds.add(et.idEntry)
                        }
                    }
                    filteredEntryLines = filteredEntryLines.filter((el) => matchingEntryIds.has(el.idEntry))
                }

                return (
                            <Section.Root>
                                <Section.Item>
                                    <div
                                        className={css({
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "end",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                        })}
                                    >
                                        <ReportFilterPopover
                                            selectedJournalId={selectedJournalId}
                                            onJournalChange={setSelectedJournalId}
                                            journalOptions={journalOptions}
                                            selectedTags={selectedTags}
                                            onTagsChange={setSelectedTags}
                                            tagOptions={tagOptions}
                                        />
                                    </div>
                                    <Box>
                                        <BalanceReportTable
                                            entryLines={filteredEntryLines}
                                            accounts={filteredAccounts}
                                        />
                                    </Box>
                                </Section.Item>
                            </Section.Root>
                )
            }}
        </YearDataWrapper>
    )
}
