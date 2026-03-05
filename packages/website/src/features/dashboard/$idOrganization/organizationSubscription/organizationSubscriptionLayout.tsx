import { IconReceipt, IconRosetteDiscountCheck } from "@tabler/icons-react"
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
                            label: "Statut",
                            icon: <IconRosetteDiscountCheck />,
                            to: "/dashboard/organisations/$idOrganization/abonnement",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                        {
                            label: "Historique",
                            icon: <IconReceipt />,
                            to: "/dashboard/organisations/$idOrganization/abonnement/historique",
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
