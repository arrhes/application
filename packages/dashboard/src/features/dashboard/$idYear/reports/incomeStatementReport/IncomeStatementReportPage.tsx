import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { Box } from "../../../../../components/layouts/Box.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import type { YearDataKey } from "../../YearDataWrapper.tsx"
import { YearDataWrapper } from "../../YearDataWrapper.tsx"
import { ReportFilterPopover } from "../ReportFilterPopover.tsx"
import { DownloadIncomeStatementReport } from "./DownloadIncomeStatementReport.tsx"
import { IncomeStatementsReportTable } from "./IncomeStatementsReportTable.tsx"

const requiredKeys = [
    "accounts",
    "entries",
    "entryLines",
    "incomeStatements",
    "computations",
    "computationIncomeStatements",
    "journals",
    "tags",
    "entryTags",
] as const satisfies readonly YearDataKey[]

export function IncomeStatementReportPage({
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
            {({
                accounts,
                entries,
                entryLines,
                incomeStatements,
                computations,
                computationIncomeStatements,
                journals,
                tags,
                entryTags,
            }) => {
                let filteredEntryLines = entryLines.filter(
                    (entryLine) => entryLine.isComputedForIncomeStatementReport === true,
                )
                const filteredAccounts = accounts.filter((account) => account.type === "income-statement")

                const journalOptions = journals.map((j) => ({
                    key: j.id,
                    label: `${j.code} ${j.label ?? ""}`.trim(),
                }))

                const tagOptions = tags.map((t) => ({
                    key: t.id,
                    label: t.label,
                }))

                if (selectedJournalId) {
                    const matchingEntryIds = new Set(
                        entries.filter((entry) => entry.idJournal === selectedJournalId).map((entry) => entry.id),
                    )
                    filteredEntryLines = filteredEntryLines.filter((el) => matchingEntryIds.has(el.idEntry))
                }

                if (selectedTags.length > 0) {
                    const selectedTagIds = new Set(selectedTags.map((t) => t.key))
                    const matchingEntryIds = new Set(
                        entryTags.filter((et) => selectedTagIds.has(et.idTag)).map((et) => et.idEntry),
                    )
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
                                            alignItems: "start",
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
                                        <DownloadIncomeStatementReport
                                            idOrganization={idOrganization}
                                            idYear={idYear}
                                            incomeStatements={incomeStatements}
                                            computations={computations}
                                            computationIncomeStatements={computationIncomeStatements}
                                            entryLines={filteredEntryLines}
                                            accounts={filteredAccounts}
                                        />
                                    </div>
                                    <div
                                        className={css({
                                            width: "100%",
                                        })}
                                    >
                                        <Box>
                                            <IncomeStatementsReportTable
                                                incomeStatements={incomeStatements}
                                                computations={computations}
                                                computationIncomeStatements={computationIncomeStatements}
                                                entryLines={filteredEntryLines}
                                                accounts={filteredAccounts}
                                            />
                                        </Box>
                                    </div>
                                </Section.Item>
                            </Section.Root>
                )
            }}
        </YearDataWrapper>
    )
}
