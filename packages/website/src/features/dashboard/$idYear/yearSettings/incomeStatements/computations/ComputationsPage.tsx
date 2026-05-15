import { ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCalculator, IconPlus, IconReportMoney } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../../../components/layouts/Box.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"
import { Tab } from "../../../../../../components/layouts/tab/tab.tsx"
import { incomeStatementsLayoutRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsLayoutRoute.tsx"
import { ComputationsTable } from "./ComputationsTable.tsx"
import { CreateOneComputation } from "./CreateOneComputation.tsx"

export function ComputationsPage() {
    const params = useParams({
        from: incomeStatementsLayoutRoute.id,
    })

    return (
        <Section.Root>
            <Section.Item>
                <Tab.Root
                    tabs={[
                        {
                            label: "Postes",
                            icon: <IconReportMoney />,
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            },
                        },
                        {
                            label: "Calculs",
                            icon: <IconCalculator />,
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/calculs",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            },
                        },
                    ]}
                />
            </Section.Item>
            <Section.Item>
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                    })}
                >
                    <CreateOneComputation
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonPlainContent
                            leftIcon={<IconPlus />}
                            text="Ajouter une ligne de calcul"
                        />
                    </CreateOneComputation>
                </div>
                <Box
                    className={css({
                        maxH: "[640px]",
                        overflowY: "auto",
                    })}
                >
                    <ComputationsTable
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    />
                </Box>
            </Section.Item>
        </Section.Root>
    )
}
