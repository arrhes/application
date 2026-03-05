import { IconBook, IconBook2, IconChartBar, IconReport, IconReportMoney, IconScale } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { SubPageLayout } from "../../../../components/layouts/subPageLayout.js"
import { reportsLayoutRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"

export function ReportsLayout() {
    const params = useParams({ from: reportsLayoutRoute.id })

    return (
        <SubPageLayout
            sections={{
                journals: {
                    title: "Journaux",
                    icon: <IconBook size={14} />,
                    items: [
                        {
                            label: "Livre-journal",
                            icon: <IconBook />,
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/documents/livre-journal",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            },
                        },
                        {
                            label: "Grand livre",
                            icon: <IconBook2 />,
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/documents/grand-livre",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            },
                        },
                    ],
                },
                summaries: {
                    title: "Synthèses",
                    icon: <IconChartBar size={14} />,
                    items: [
                        {
                            label: "Balance",
                            icon: <IconScale />,
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/documents/balance",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            },
                        },
                        {
                            label: "Bilan",
                            icon: <IconReport />,
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/documents/bilan",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            },
                        },
                        {
                            label: "Compte de résultat",
                            icon: <IconReportMoney />,
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/documents/compte-de-résultat",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            },
                        },
                    ],
                },
            }}
        />
    )
}
