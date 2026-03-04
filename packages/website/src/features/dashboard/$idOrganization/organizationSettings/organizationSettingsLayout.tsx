import { IconDatabase, IconHome, IconLock } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { SubPageLayout } from "../../../../components/layouts/subPageLayout.tsx"
import { organizationSettingsLayoutRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationSettings/organizationSettingsLayoutRoute.tsx"

export function OrganizationSettingsLayout() {
    const params = useParams({ from: organizationSettingsLayoutRoute.id })

    return (
        <SubPageLayout
            sections={{
                settings: {
                    items: [
                        {
                            label: "Général",
                            icon: <IconHome />,
                            to: "/dashboard/organisations/$idOrganization/paramètres",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                        {
                            label: "Stockage",
                            icon: <IconDatabase />,
                            to: "/dashboard/organisations/$idOrganization/paramètres/stockage",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                        {
                            label: "Sécurité",
                            icon: <IconLock />,
                            to: "/dashboard/organisations/$idOrganization/paramètres/sécurité",
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
