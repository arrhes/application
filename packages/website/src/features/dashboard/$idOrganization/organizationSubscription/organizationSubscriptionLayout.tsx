import { IconFileInvoice, IconReceipt, IconWallet } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { SubPageLayout } from "../../../../components/layouts/subPageLayout.tsx"
import { organizationSubscriptionLayoutRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationSubscription/organizationSubscriptionLayoutRoute.tsx"

export function OrganizationSubscriptionLayout() {
    const params = useParams({ from: organizationSubscriptionLayoutRoute.id })

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
                            icon: <IconReceipt />,
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
