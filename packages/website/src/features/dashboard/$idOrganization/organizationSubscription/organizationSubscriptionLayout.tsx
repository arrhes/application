import { IconChartBar, IconFileInvoice, IconReceipt, IconWallet } from "@tabler/icons-react"
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
                            to: "/dashboard/organisations/$idOrganization/abonnement",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                        {
                            label: "Services",
                            icon: <IconReceipt />,
                            to: "/dashboard/organisations/$idOrganization/abonnement/services",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                        {
                            label: "Utilisation",
                            icon: <IconChartBar />,
                            to: "/dashboard/organisations/$idOrganization/abonnement/utilisation",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                        {
                            label: "Paiements",
                            icon: <IconReceipt />,
                            to: "/dashboard/organisations/$idOrganization/abonnement/historique",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                        {
                            label: "Factures",
                            icon: <IconFileInvoice />,
                            to: "/dashboard/organisations/$idOrganization/abonnement/factures",
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
