import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { Box } from "../../../../../../../../components/layouts/box.tsx"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { journalReportRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/journalReportRoute.tsx"
import type { YearDataKey } from "../../yearDataWrapper.tsx"
import { YearDataWrapper } from "../../yearDataWrapper.tsx"
import { JournalReportTable } from "./journalReportTable.tsx"

const PAGE_SIZE = 20

const requiredKeys = ["records", "recordRows", "accounts"] as const satisfies readonly YearDataKey[]

export function JournalReportPage() {
    const params = useParams({ from: journalReportRoute.id })
    const [pageIndex, setPageIndex] = useState(0)

    return (
        <YearDataWrapper idYear={params.idYear} requiredKeys={requiredKeys}>
            {({ records, recordRows, accounts }) => {
                const accountsMap = new Map(accounts.map((account) => [account.id, account]))

                const filteredRecordRows = recordRows.filter(
                    (recordRow) => recordRow.isComputedForJournalReport === true,
                )
                const sortedRecords = [...records].sort((a, b) => b.date.localeCompare(a.date))

                const pageCount = Math.max(1, Math.ceil(sortedRecords.length / PAGE_SIZE))
                const clampedPageIndex = Math.min(pageIndex, pageCount - 1)
                const paginatedRecords = sortedRecords.slice(
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
                                    <Box>
                                        <JournalReportTable
                                            records={paginatedRecords}
                                            recordRows={filteredRecordRows}
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
                                                {sortedRecords.length} écriture{sortedRecords.length > 1 ? "s" : ""}
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
