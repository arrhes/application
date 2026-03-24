import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../../components/layouts/box.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { balanceReportRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/balanceReportRoute.tsx"
import type { YearDataKey } from "../../yearDataWrapper.tsx"
import { YearDataWrapper } from "../../yearDataWrapper.tsx"
import { BalanceReportTable } from "./balanceReportTable.tsx"

const requiredKeys = ["accounts", "entryLines"] as const satisfies readonly YearDataKey[]

export function BalanceReportPage() {
    const params = useParams({ from: balanceReportRoute.id })

    return (
        <YearDataWrapper idYear={params.idYear} requiredKeys={requiredKeys}>
            {({ accounts, entryLines }) => (
                <Page.Root>
                    <Page.Content>
                        <Section.Root>
                            <Section.Item>
                                <Box>
                                    <BalanceReportTable
                                        entryLines={entryLines.filter(
                                            (entryLine) => entryLine.isComputedForBalanceReport === true,
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
