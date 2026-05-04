import { IconFileInvoice, IconPuzzle, IconReceipt, IconWallet } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { SubPageLayout } from "../../../../components/layouts/subPageLayout.tsx"
import { organizationBillingLayoutRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationBilling/organizationBillingLayoutRoute.tsx"

export function OrganizationBillingLayout() {
    const params = useParams({ from: organizationBillingLayoutRoute.id })

    return (
        <SubPageLayout
            sections={{
                subscription: {
                    items: [
                        {
                            label: "Portefeuille",
                            icon: <IconWallet />,
                            to: "/dashboard/organisations/$idOrganization/facturation",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                        {
                            label: "Services",
                            icon: <IconPuzzle />,
                            to: "/dashboard/organisations/$idOrganization/facturation/services",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                        {
                            label: "Paiements",
                            icon: <IconReceipt />,
                            to: "/dashboard/organisations/$idOrganization/facturation/historique",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                        {
                            label: "Factures",
                            icon: <IconFileInvoice />,
                            to: "/dashboard/organisations/$idOrganization/facturation/factures",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                    ],
                },
            }}
        />
    )
}
