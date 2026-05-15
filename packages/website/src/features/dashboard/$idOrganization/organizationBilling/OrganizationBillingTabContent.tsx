import { IconFileInvoice, IconPuzzle, IconReceipt, IconWallet } from "@tabler/icons-react"
import { lazy, Suspense } from "react"
import { SubPageContent } from "../../../../components/layouts/SubPageContent.tsx"

const OrganizationWalletPage = lazy(() =>
    import("./wallet/OrganizationWalletPage.js").then((m) => ({
        default: m.OrganizationWalletPage,
    })),
)
const OrganizationServicesPage = lazy(() =>
    import("./OrganizationServicesPage.js").then((m) => ({
        default: m.OrganizationServicesPage,
    })),
)
const OrganizationBillingHistoryPage = lazy(() =>
    import("./OrganizationBillingHistoryPage.js").then((m) => ({
        default: m.OrganizationBillingHistoryPage,
    })),
)
const OrganizationInvoicesPage = lazy(() =>
    import("./invoices/OrganizationInvoicesPage.js").then((m) => ({
        default: m.OrganizationInvoicesPage,
    })),
)

export function OrganizationBillingTabContent(props: { idOrganization: string }) {
    return (
        <SubPageContent
            defaultKey="portefeuille"
            sections={{
                subscription: {
                    items: [
                        {
                            key: "portefeuille",
                            label: "Portefeuille",
                            icon: <IconWallet />,
                            content: (
                                <Suspense fallback={null}>
                                    <OrganizationWalletPage idOrganization={props.idOrganization} />
                                </Suspense>
                            ),
                        },
                        {
                            key: "services",
                            label: "Services",
                            icon: <IconPuzzle />,
                            content: (
                                <Suspense fallback={null}>
                                    <OrganizationServicesPage idOrganization={props.idOrganization} />
                                </Suspense>
                            ),
                        },
                        {
                            key: "paiements",
                            label: "Paiements",
                            icon: <IconReceipt />,
                            content: (
                                <Suspense fallback={null}>
                                    <OrganizationBillingHistoryPage />
                                </Suspense>
                            ),
                        },
                        {
                            key: "factures",
                            label: "Factures",
                            icon: <IconFileInvoice />,
                            content: (
                                <Suspense fallback={null}>
                                    <OrganizationInvoicesPage idOrganization={props.idOrganization} />
                                </Suspense>
                            ),
                        },
                    ],
                },
            }}
        />
    )
}
