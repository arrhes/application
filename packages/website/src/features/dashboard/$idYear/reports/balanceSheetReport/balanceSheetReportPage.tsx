import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDownload } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../../components/layouts/box.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { TitleComponent } from "../../../../../components/layouts/title.tsx"
import { balanceSheetReportRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/balanceSheetReportRoute.tsx"
import type { YearDataKey } from "../../yearDataWrapper.tsx"
import { YearDataWrapper } from "../../yearDataWrapper.tsx"
import { BalanceSheetAssetsReportTable } from "./balanceSheetAsset/balanceSheetAssetsReportTable.tsx"
import { BalanceSheetLiabilitiesReportTable } from "./balanceSheetLiability/balanceSheetLiabilitiesReportTable.tsx"
import { DownloadBalanceSheetReport } from "./downloadBalanceSheetReport.tsx"

const requiredKeys = ["accounts", "recordRows", "balanceSheets"] as const satisfies readonly YearDataKey[]

export function BalanceSheetReportPage() {
    const params = useParams({ from: balanceSheetReportRoute.id })

    return (
        <YearDataWrapper idYear={params.idYear} requiredKeys={requiredKeys}>
            {({ accounts, recordRows, balanceSheets }) => (
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
                                        justifyContent: "start",
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
                                            recordRows={recordRows.filter(
                                                (recordRow) => recordRow.isComputedForBalanceSheetReport === true,
                                            )}
                                            accounts={accounts.filter((account) => account.type === "balance-sheet")}
                                        />
                                    </Box>
                                    <Box className={css({ gap: "4" })}>
                                        <TitleComponent className={css({ padding: "4" })}>Passif</TitleComponent>
                                        <BalanceSheetLiabilitiesReportTable
                                            balanceSheets={balanceSheets.filter(
                                                (balanceSheet) => balanceSheet.side === "liability",
                                            )}
                                            recordRows={recordRows.filter(
                                                (recordRow) => recordRow.isComputedForBalanceSheetReport === true,
                                            )}
                                            accounts={accounts.filter((account) => account.type === "balance-sheet")}
                                        />
                                    </Box>
                                </div>
                            </Section.Item>
                        </Section.Root>
                    </Page.Content>
                </Page.Root>
            )}
        </YearDataWrapper>
    )
}
