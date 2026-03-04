import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../../components/layouts/box.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { ledgerReportRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/ledgerReportRoute.tsx"
import type { YearDataKey } from "../../yearDataWrapper.tsx"
import { YearDataWrapper } from "../../yearDataWrapper.tsx"
import { LedgerReportTable } from "./ledgerReportTable.tsx"

const requiredKeys = ["accounts", "recordRows"] as const satisfies readonly YearDataKey[]

export function LedgerReportPage() {
    const params = useParams({ from: ledgerReportRoute.id })

    return (
        <YearDataWrapper idYear={params.idYear} requiredKeys={requiredKeys}>
            {({ accounts, recordRows }) => (
                <Page.Root>
                    <Page.Content>
                        <Section.Root>
                            <Section.Item>
                                <Box>
                                    <LedgerReportTable
                                        recordRows={recordRows.filter(
                                            (recordRow) => recordRow.isComputedForLedgerReport === true,
                                        )}
                                        accounts={accounts}
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
