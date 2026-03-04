import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDownload } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../../../../../components/layouts/box.tsx"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { incomeStatementReportRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/incomeStatementReportRoute.tsx"
import type { YearDataKey } from "../../yearDataWrapper.tsx"
import { YearDataWrapper } from "../../yearDataWrapper.tsx"
import { DownloadIncomeStatementReport } from "./downloadIncomeStatementReport.tsx"
import { IncomeStatementsReportTable } from "./incomeStatementsReportTable.tsx"

const requiredKeys = [
    "accounts",
    "recordRows",
    "incomeStatements",
    "computations",
    "computationIncomeStatements",
] as const satisfies readonly YearDataKey[]

export function IncomeStatementReportPage() {
    const params = useParams({ from: incomeStatementReportRoute.id })

    return (
        <YearDataWrapper idYear={params.idYear} requiredKeys={requiredKeys}>
            {({ accounts, recordRows, incomeStatements, computations, computationIncomeStatements }) => (
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
                                    <DownloadIncomeStatementReport
                                        idOrganization={params.idOrganization}
                                        idYear={params.idYear}
                                    >
                                        <ButtonOutlineContent leftIcon={<IconDownload />} text="Télécharger en pdf" />
                                    </DownloadIncomeStatementReport>
                                </div>
                                <Box>
                                    <IncomeStatementsReportTable
                                        incomeStatements={incomeStatements}
                                        computations={computations}
                                        computationIncomeStatements={computationIncomeStatements}
                                        recordRows={recordRows.filter(
                                            (recordRow) => recordRow.isComputedForIncomeStatementReport === true,
                                        )}
                                        accounts={accounts.filter((account) => account.type === "income-statement")}
                                    />
                                </Box>
                            </Section.Item>
                        </Section.Root>
                    </Page.Content>
                </Page.Root>
            )}
        </YearDataWrapper>
    )
}
