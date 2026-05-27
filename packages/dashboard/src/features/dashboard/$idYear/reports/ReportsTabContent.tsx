import { IconBook, IconBook2, IconChartBar, IconReport, IconReportMoney, IconScale } from "@tabler/icons-react"
import { lazy, Suspense } from "react"
import { SubPageContent } from "../../../../components/layouts/SubPageContent.tsx"

const JournalReportPage = lazy(() =>
    import("./journalReport/JournalReportPage.js").then((m) => ({
        default: m.JournalReportPage,
    })),
)
const LedgerReportPage = lazy(() =>
    import("./ledgerReport/LedgerReportPage.js").then((m) => ({
        default: m.LedgerReportPage,
    })),
)
const BalanceReportPage = lazy(() =>
    import("./balanceReport/BalanceReportPage.js").then((m) => ({
        default: m.BalanceReportPage,
    })),
)
const BalanceSheetReportPage = lazy(() =>
    import("./balanceSheetReport/BalanceSheetReportPage.js").then((m) => ({
        default: m.BalanceSheetReportPage,
    })),
)
const IncomeStatementReportPage = lazy(() =>
    import("./incomeStatementReport/IncomeStatementReportPage.js").then((m) => ({
        default: m.IncomeStatementReportPage,
    })),
)

export function ReportsTabContent(props: { idOrganization: string; idYear: string }) {
    return (
        <SubPageContent
            defaultKey="livre-journal"
            sections={{
                journals: {
                    title: "Journaux",
                    icon: <IconBook size={14} />,
                    items: [
                        {
                            key: "livre-journal",
                            label: "Livre-journal",
                            icon: <IconBook />,
                            content: (
                                <Suspense fallback={null}>
                                    <JournalReportPage idYear={props.idYear} />
                                </Suspense>
                            ),
                        },
                        {
                            key: "grand-livre",
                            label: "Grand livre",
                            icon: <IconBook2 />,
                            content: (
                                <Suspense fallback={null}>
                                    <LedgerReportPage idYear={props.idYear} />
                                </Suspense>
                            ),
                        },
                    ],
                },
                summaries: {
                    title: "Synthèses",
                    icon: <IconChartBar size={14} />,
                    items: [
                        {
                            key: "balance",
                            label: "Balance",
                            icon: <IconScale />,
                            content: (
                                <Suspense fallback={null}>
                                    <BalanceReportPage idYear={props.idYear} />
                                </Suspense>
                            ),
                        },
                        {
                            key: "bilan",
                            label: "Bilan",
                            icon: <IconReport />,
                            content: (
                                <Suspense fallback={null}>
                                    <BalanceSheetReportPage
                                        idOrganization={props.idOrganization}
                                        idYear={props.idYear}
                                    />
                                </Suspense>
                            ),
                        },
                        {
                            key: "compte-de-résultat",
                            label: "Compte de résultat",
                            icon: <IconReportMoney />,
                            content: (
                                <Suspense fallback={null}>
                                    <IncomeStatementReportPage
                                        idOrganization={props.idOrganization}
                                        idYear={props.idYear}
                                    />
                                </Suspense>
                            ),
                        },
                    ],
                },
            }}
        />
    )
}
