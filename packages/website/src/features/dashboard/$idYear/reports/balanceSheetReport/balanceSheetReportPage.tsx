import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { Box } from "../../../../../components/layouts/box.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { balanceSheetReportRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/balanceSheetReportRoute.tsx"
import type { YearDataKey } from "../../yearDataWrapper.tsx"
import { YearDataWrapper } from "../../yearDataWrapper.tsx"
import { ReportFilterPopover } from "../reportFilterPopover.tsx"
import { BalanceSheetAssetsReportTable } from "./balanceSheetAsset/balanceSheetAssetsReportTable.tsx"
import { BalanceSheetLiabilitiesReportTable } from "./balanceSheetLiability/balanceSheetLiabilitiesReportTable.tsx"
import { DownloadBalanceSheetReport } from "./downloadBalanceSheetReport.tsx"

const requiredKeys = [
    "accounts",
    "entries",
    "entryLines",
    "balanceSheets",
    "journals",
    "tags",
    "entryTags",
] as const satisfies readonly YearDataKey[]

export function BalanceSheetReportPage() {
    const params = useParams({
        from: balanceSheetReportRoute.id,
    })
    const [selectedJournalId, setSelectedJournalId] = useState<string | null>(null)
    const [selectedTags, setSelectedTags] = useState<
        Array<{
            key: string
            label: string
        }>
    >([])
    const [activeTab, setActiveTab] = useState<"asset" | "liability">("asset")
    return (
        <YearDataWrapper
            idYear={params.idYear}
            requiredKeys={requiredKeys}
        >
            {({ accounts, entries, entryLines, balanceSheets, journals, tags, entryTags }) => {
                let filteredEntryLines = entryLines.filter(
                    (entryLine) => entryLine.isComputedForBalanceSheetReport === true,
                )
                const filteredAccounts = accounts.filter((account) => account.type === "balance-sheet")

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
                    <Page.Root>
                        <Page.Content>
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
                                        <DownloadBalanceSheetReport
                                            idOrganization={params.idOrganization}
                                            idYear={params.idYear}
                                            balanceSheets={balanceSheets}
                                            entryLines={filteredEntryLines}
                                            accounts={filteredAccounts}
                                        />
                                    </div>
                                    <div
                                        className={css({
                                            width: "100%",
                                        })}
                                    >
                                        <div
                                            className={css({
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                                borderBottom: "1px solid",
                                                borderBottomColor: "neutral/5",
                                                paddingBottom: "0.5rem",
                                                marginBottom: "1rem",
                                            })}
                                        >
                                            <Button onClick={() => setActiveTab("asset")}>
                                                <ButtonGhostContent
                                                    text="Actif"
                                                    color="default"
                                                    isCurrent={activeTab === "asset"}
                                                />
                                            </Button>
                                            <Button onClick={() => setActiveTab("liability")}>
                                                <ButtonGhostContent
                                                    text="Passif"
                                                    color="default"
                                                    isCurrent={activeTab === "liability"}
                                                />
                                            </Button>
                                        </div>
                                        <div
                                            style={{
                                                display: activeTab === "asset" ? undefined : "none",
                                            }}
                                            className={css({
                                                width: "100%",
                                            })}
                                        >
                                            <Box
                                                className={css({
                                                    width: "100%",
                                                })}
                                            >
                                                <BalanceSheetAssetsReportTable
                                                    balanceSheets={balanceSheets.filter(
                                                        (balanceSheet) => balanceSheet.side === "asset",
                                                    )}
                                                    entryLines={filteredEntryLines}
                                                    accounts={filteredAccounts}
                                                />
                                            </Box>
                                        </div>
                                        <div
                                            style={{
                                                display: activeTab === "liability" ? undefined : "none",
                                            }}
                                            className={css({
                                                width: "100%",
                                            })}
                                        >
                                            <Box
                                                className={css({
                                                    width: "100%",
                                                })}
                                            >
                                                <BalanceSheetLiabilitiesReportTable
                                                    balanceSheets={balanceSheets.filter(
                                                        (balanceSheet) => balanceSheet.side === "liability",
                                                    )}
                                                    entryLines={filteredEntryLines}
                                                    accounts={filteredAccounts}
                                                />
                                            </Box>
                                        </div>
                                    </div>
                                </Section.Item>
                            </Section.Root>
                        </Page.Content>
                    </Page.Root>
                )
            }}
        </YearDataWrapper>
    )
}
