import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDownload } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { Box } from "../../../../../components/layouts/box.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { TitleComponent } from "../../../../../components/layouts/title.tsx"
import { balanceSheetReportRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/balanceSheetReportRoute.tsx"
import type { YearDataKey } from "../../yearDataWrapper.tsx"
import { YearDataWrapper } from "../../yearDataWrapper.tsx"
import { ReportFilterPopover } from "../reportFilterPopover.tsx"
import { BalanceSheetAssetsReportTable } from "./balanceSheetAsset/balanceSheetAssetsReportTable.tsx"
import { BalanceSheetLiabilitiesReportTable } from "./balanceSheetLiability/balanceSheetLiabilitiesReportTable.tsx"
import { DownloadBalanceSheetReport } from "./downloadBalanceSheetReport.tsx"

const requiredKeys = ["accounts", "entries", "entryLines", "balanceSheets", "journals", "tags", "entryTags"] as const satisfies readonly YearDataKey[]

export function BalanceSheetReportPage() {
    const params = useParams({ from: balanceSheetReportRoute.id })
    const [selectedJournalId, setSelectedJournalId] = useState<string | null>(null)
    const [selectedTags, setSelectedTags] = useState<Array<{ key: string; label: string }>>([])

    return (
        <YearDataWrapper idYear={params.idYear} requiredKeys={requiredKeys}>
            {({ accounts, entries, entryLines, balanceSheets, journals, tags, entryTags }) => {
                let filteredEntryLines = entryLines.filter(
                    (entryLine) => entryLine.isComputedForBalanceSheetReport === true,
                )
                const filteredAccounts = accounts.filter((account) => account.type === "balance-sheet")

                const journalOptions = journals.map((j) => ({
                    key: j.id,
                    label: `${j.code} ${j.label ?? ""}`.trim(),
                }))

                const tagOptions = tags.map((t) => ({ key: t.id, label: t.label }))

                if (selectedJournalId) {
                    const matchingEntryIds = new Set(
                        entries
                            .filter((entry) => entry.idJournal === selectedJournalId)
                            .map((entry) => entry.id),
                    )
                    filteredEntryLines = filteredEntryLines.filter((el) =>
                        matchingEntryIds.has(el.idEntry),
                    )
                }

                if (selectedTags.length > 0) {
                    const selectedTagIds = new Set(selectedTags.map((t) => t.key))
                    const matchingEntryIds = new Set(
                        entryTags
                            .filter((et) => selectedTagIds.has(et.idTag))
                            .map((et) => et.idEntry),
                    )
                    filteredEntryLines = filteredEntryLines.filter((el) =>
                        matchingEntryIds.has(el.idEntry),
                    )
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
                                        >
                                            <ButtonOutlineContent leftIcon={<IconDownload />} text="Télécharger en pdf" />
                                        </DownloadBalanceSheetReport>
                                    </div>
                                    <div
                                        className={css({
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "end",
                                            alignItems: "start",
                                            gap: "4",
                                            flexWrap: "wrap",
                                        })}
                                    >
                                        <Box className={css({ gap: "4" })}>
                                            <TitleComponent className={css({ padding: "4" })}>Actif</TitleComponent>
                                            <BalanceSheetAssetsReportTable
                                                balanceSheets={balanceSheets.filter(
                                                    (balanceSheet) => balanceSheet.side === "asset",
                                                )}
                                                entryLines={filteredEntryLines}
                                                accounts={filteredAccounts}
                                            />
                                        </Box>
                                        <Box className={css({ gap: "4" })}>
                                            <TitleComponent className={css({ padding: "4" })}>Passif</TitleComponent>
                                            <BalanceSheetLiabilitiesReportTable
                                                balanceSheets={balanceSheets.filter(
                                                    (balanceSheet) => balanceSheet.side === "liability",
                                                )}
                                                entryLines={filteredEntryLines}
                                                accounts={filteredAccounts}
                                            />
                                        </Box>
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
