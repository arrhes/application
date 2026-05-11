import { ButtonPlainContent, InputDebounced, InputText } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCalculator, IconPlus, IconReportMoney } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useCallback, useState, useTransition } from "react"
import { Box } from "../../../../../components/layouts/box.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { Tab } from "../../../../../components/layouts/tab/tab.tsx"
import { incomeStatementsLayoutRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsLayoutRoute.tsx"
import { CreateOneIncomeStatement } from "./createOneIncomeStatement.tsx"
import { IncomeStatementsTable } from "./incomeStatementsTable.tsx"

export function IncomeStatementsPage() {
    const params = useParams({
        from: incomeStatementsLayoutRoute.id,
    })
    const [globalFilter, setGlobalFilter] = useState("")
    const [, startTransition] = useTransition()

    const handleFilterChange = useCallback((value: string | undefined) => {
        startTransition(() => {
            setGlobalFilter(value ?? "")
        })
    }, [])

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
                        minWidth: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                    })}
                >
                    <CreateOneIncomeStatement
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonPlainContent
                            leftIcon={<IconPlus />}
                            text="Ajouter une ligne de compte de résultat"
                        />
                    </CreateOneIncomeStatement>
                </div>
                <InputDebounced
                    value={globalFilter ?? ""}
                    onChange={handleFilterChange}
                >
                    <InputText
                        placeholder="Recherche"
                        className={css({
                            maxWidth: "[320px]",
                        })}
                    />
                </InputDebounced>
                <Box
                    className={css({
                        maxH: "[640px]",
                        overflowY: "auto",
                    })}
                >
                    <IncomeStatementsTable
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                        globalFilter={globalFilter}
                    />
                </Box>
            </Section.Item>
        </Section.Root>
    )
}
