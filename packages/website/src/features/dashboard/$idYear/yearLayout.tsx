import { IconFolders, IconPencil, IconReport, IconSettings } from "@tabler/icons-react"
import { Outlet, useParams } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import { PageNavigation } from "../../../components/layouts/page/pageNavigation.tsx"
import { yearLayoutRoute } from "../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearLayoutRoute.tsx"

export function YearLayout() {
    const params = useParams({ from: yearLayoutRoute.id })

    return (
        <Fragment>
            <PageNavigation
                tabs={[
                    {
                        label: "Écritures",
                        icon: <IconPencil />,
                        to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures",
                        params: {
                            idOrganization: params.idOrganization,
                            idYear: params.idYear,
                        },
                    },
                    {
                        label: "Stockage",
                        icon: <IconFolders />,
                        to: "/dashboard/organisations/$idOrganization/exercices/$idYear/stockage",
                        params: {
                            idOrganization: params.idOrganization,
                            idYear: params.idYear,
                        },
                    },
                    {
                        label: "Documents comptables",
                        icon: <IconReport />,
                        to: "/dashboard/organisations/$idOrganization/exercices/$idYear/documents",
                        params: {
                            idOrganization: params.idOrganization,
                            idYear: params.idYear,
                        },
                    },
                    {
                        label: "Paramètres",
                        icon: <IconSettings />,
                        to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres",
                        params: {
                            idOrganization: params.idOrganization,
                            idYear: params.idYear,
                        },
                    },
                ]}
            />
            <Outlet />
        </Fragment>
    )
}
