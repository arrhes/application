import {
    IconBook,
    IconFileReport,
    IconHome,
    IconListNumbers,
    IconPackage,
    IconReportMoney,
    IconScale,
    IconSettings,
    IconTag,
} from "@tabler/icons-react"
import { lazy, Suspense } from "react"
import { SubPageContent } from "../../../../components/layouts/SubPageContent.tsx"

const YearSettingsPage = lazy(() =>
    import("./YearSettingsPage.js").then((m) => ({
        default: m.YearSettingsPage,
    })),
)
const AccountsPage = lazy(() =>
    import("./accounts/AccountsPage.js").then((m) => ({
        default: m.AccountsPage,
    })),
)
const JournalsPage = lazy(() =>
    import("./journals/JournalsPage.js").then((m) => ({
        default: m.JournalsPage,
    })),
)
const TagsPage = lazy(() =>
    import("./tags/TagsPage.js").then((m) => ({
        default: m.TagsPage,
    })),
)
const BalanceSheetsPage = lazy(() =>
    import("./balanceSheets/BalanceSheetsPage.js").then((m) => ({
        default: m.BalanceSheetsPage,
    })),
)
const IncomeStatementsPage = lazy(() =>
    import("./incomeStatements/IncomeStatementsPage.js").then((m) => ({
        default: m.IncomeStatementsPage,
    })),
)
const InventoryPage = lazy(() =>
    import("./inventory/InventoryPage.js").then((m) => ({
        default: m.InventoryPage,
    })),
)

export function YearSettingsTabContent(props: { idOrganization: string; idYear: string }) {
    return (
        <SubPageContent
            defaultKey="général"
            sections={{
                settings: {
                    title: "Paramètres",
                    icon: <IconSettings size={14} />,
                    items: [
                        {
                            key: "général",
                            label: "Général",
                            icon: <IconHome />,
                            content: (
                                <Suspense fallback={null}>
                                    <YearSettingsPage
                                        idOrganization={props.idOrganization}
                                        idYear={props.idYear}
                                    />
                                </Suspense>
                            ),
                        },
                        {
                            key: "comptes",
                            label: "Plan des comptes",
                            icon: <IconListNumbers />,
                            content: (
                                <Suspense fallback={null}>
                                    <AccountsPage
                                        idOrganization={props.idOrganization}
                                        idYear={props.idYear}
                                    />
                                </Suspense>
                            ),
                        },
                        {
                            key: "journaux",
                            label: "Journaux",
                            icon: <IconBook />,
                            content: (
                                <Suspense fallback={null}>
                                    <JournalsPage
                                        idOrganization={props.idOrganization}
                                        idYear={props.idYear}
                                    />
                                </Suspense>
                            ),
                        },
                        {
                            key: "catégories",
                            label: "Catégories",
                            icon: <IconTag />,
                            content: (
                                <Suspense fallback={null}>
                                    <TagsPage
                                        idOrganization={props.idOrganization}
                                        idYear={props.idYear}
                                    />
                                </Suspense>
                            ),
                        },
                        {
                            key: "inventaire",
                            label: "Inventaire",
                            icon: <IconPackage />,
                            content: (
                                <Suspense fallback={null}>
                                    <InventoryPage
                                        idOrganization={props.idOrganization}
                                        idYear={props.idYear}
                                    />
                                </Suspense>
                            ),
                        },
                    ],
                },
                documents: {
                    title: "Documents comptables",
                    icon: <IconFileReport size={14} />,
                    items: [
                        {
                            key: "bilan",
                            label: "Bilan",
                            icon: <IconScale />,
                            content: (
                                <Suspense fallback={null}>
                                    <BalanceSheetsPage
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
                                    <IncomeStatementsPage
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
