import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { Box } from "../../../../../components/layouts/box.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { journalReportRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/journalReportRoute.tsx"
import type { YearDataKey } from "../../yearDataWrapper.tsx"
import { YearDataWrapper } from "../../yearDataWrapper.tsx"
import { ReportFilterPopover } from "../reportFilterPopover.tsx"
import { JournalReportTable } from "./journalReportTable.tsx"

const PAGE_SIZE = 20

const requiredKeys = [
    "entries",
    "entryLines",
    "accounts",
    "journals",
    "tags",
    "entryTags",
] as const satisfies readonly YearDataKey[]

export function JournalReportPage() {
    const params = useParams({ from: journalReportRoute.id })
    const [pageIndex, setPageIndex] = useState(0)
    const [selectedJournalId, setSelectedJournalId] = useState<string | null>(null)
    const [selectedTags, setSelectedTags] = useState<Array<{ key: string; label: string }>>([])

    return (
        <YearDataWrapper idYear={params.idYear} requiredKeys={requiredKeys}>
            {({ entries, entryLines, accounts, journals, tags, entryTags }) => {
                const accountsMap = new Map(accounts.map((account) => [account.id, account]))

                const filteredEntryLines = entryLines.filter(
                    (entryLine) => entryLine.isComputedForJournalReport === true,
                )

                const journalOptions = journals.map((j) => ({
                    key: j.id,
                    label: `${j.code} ${j.label ?? ""}`.trim(),
                }))

                const tagOptions = tags.map((t) => ({ key: t.id, label: t.label }))

                let filteredEntries = [...entries]

                if (selectedJournalId) {
                    filteredEntries = filteredEntries.filter((entry) => entry.idJournal === selectedJournalId)
                }

                if (selectedTags.length > 0) {
                    const selectedTagIds = new Set(selectedTags.map((t) => t.key))
                    const matchingEntryIds = new Set(
                        entryTags.filter((et) => selectedTagIds.has(et.idTag)).map((et) => et.idEntry),
                    )
                    filteredEntries = filteredEntries.filter((entry) => matchingEntryIds.has(entry.id))
                }

                const filteredEntryIds = new Set(filteredEntries.map((e) => e.id))
                const filteredEntryLinesForTable = filteredEntryLines.filter((el) => filteredEntryIds.has(el.idEntry))

                const sortedEntries = filteredEntries.sort((a, b) => b.date.localeCompare(a.date))

                const pageCount = Math.max(1, Math.ceil(sortedEntries.length / PAGE_SIZE))
                const clampedPageIndex = Math.min(pageIndex, pageCount - 1)
                const paginatedEntries = sortedEntries.slice(
                    clampedPageIndex * PAGE_SIZE,
                    (clampedPageIndex + 1) * PAGE_SIZE,
                )

                const canPreviousPage = clampedPageIndex > 0
                const canNextPage = clampedPageIndex < pageCount - 1

                return (
                    <Page.Root>
                        <Page.Content>
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
                                            onJournalChange={(value) => {
                                                setSelectedJournalId(value)
                                                setPageIndex(0)
                                            }}
                                            journalOptions={journalOptions}
                                            selectedTags={selectedTags}
                                            onTagsChange={(values) => {
                                                setSelectedTags(values)
                                                setPageIndex(0)
                                            }}
                                            tagOptions={tagOptions}
                                        />
                                    </div>
                                    <Box>
                                        <JournalReportTable
                                            entries={paginatedEntries}
                                            entryLines={filteredEntryLinesForTable}
                                            accounts={accountsMap}
                                        />
                                    </Box>
                                    {pageCount > 1 ? (
                                        <div
                                            className={css({
                                                flexShrink: "0",
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                gap: "4",
                                                paddingTop: "0.75rem",
                                            })}
                                        >
                                            <span
                                                className={css({
                                                    fontSize: "sm",
                                                    color: "neutral/50",
                                                })}
                                            >
                                                {sortedEntries.length} écriture{sortedEntries.length > 1 ? "s" : ""}
                                            </span>
                                            <div
                                                className={css({
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    alignItems: "center",
                                                    gap: "0.5rem",
                                                })}
                                            >
                                                <Button
                                                    onClick={() => setPageIndex(clampedPageIndex - 1)}
                                                    isDisabled={!canPreviousPage}
                                                >
                                                    <ButtonOutlineContent
                                                        leftIcon={<IconChevronLeft size={16} />}
                                                        text={undefined}
                                                        isDisabled={!canPreviousPage}
                                                    />
                                                </Button>
                                                <span
                                                    className={css({
                                                        fontSize: "sm",
                                                        color: "neutral/50",
                                                    })}
                                                >
                                                    Page {clampedPageIndex + 1} sur {pageCount}
                                                </span>
                                                <Button
                                                    onClick={() => setPageIndex(clampedPageIndex + 1)}
                                                    isDisabled={!canNextPage}
                                                >
                                                    <ButtonOutlineContent
                                                        leftIcon={<IconChevronRight size={16} />}
                                                        text={undefined}
                                                        isDisabled={!canNextPage}
                                                    />
                                                </Button>
                                            </div>
                                        </div>
                                    ) : null}
                                </Section.Item>
                            </Section.Root>
                        </Page.Content>
                    </Page.Root>
                )
            }}
        </YearDataWrapper>
    )
}
