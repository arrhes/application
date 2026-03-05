import { IconHome, IconKey } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { SubPageLayout } from "../../../../components/layouts/subPageLayout.tsx"
import { organizationApiLayoutRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationApi/organizationApiLayoutRoute.tsx"

export function OrganizationApiLayout() {
    const params = useParams({ from: organizationApiLayoutRoute.id })

    return (
        <SubPageLayout
            sections={{
                api: {
                    items: [
                        {
                            label: "Général",
                            icon: <IconHome />,
                            to: "/dashboard/organisations/$idOrganization/api",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                        {
                            label: "Clés",
                            icon: <IconKey />,
                            to: "/dashboard/organisations/$idOrganization/api/clés",
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
