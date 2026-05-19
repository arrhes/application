import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { Box } from "../../../../../components/layouts/Box.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import type { YearDataKey } from "../../YearDataWrapper.tsx"
import { YearDataWrapper } from "../../YearDataWrapper.tsx"
import { ReportFilterPopover } from "../ReportFilterPopover.tsx"
import { BalanceSheetAssetsReportTable } from "./balanceSheetAsset/BalanceSheetAssetsReportTable.tsx"
import { BalanceSheetLiabilitiesReportTable } from "./balanceSheetLiability/BalanceSheetLiabilitiesReportTable.tsx"
import { DownloadBalanceSheetReport } from "./DownloadBalanceSheetReport.tsx"

const requiredKeys = [
    "accounts",
    "entries",
    "entryLines",
    "balanceSheets",
    "journals",
    "tags",
    "entryTags",
] as const satisfies readonly YearDataKey[]

export function BalanceSheetReportPage({
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
    const [activeTab, setActiveTab] = useState<"asset" | "liability">("asset")
    return (
        <YearDataWrapper
            idYear={idYear}
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
                                            idOrganization={idOrganization}
                                            idYear={idYear}
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
