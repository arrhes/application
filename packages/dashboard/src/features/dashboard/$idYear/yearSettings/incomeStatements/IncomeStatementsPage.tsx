import { ButtonPlainContent, InputDebounced, InputText } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCalculator, IconPlus, IconReportMoney } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useCallback, useState, useTransition } from "react"
import { Box } from "../../../../../components/layouts/Box.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { Tab } from "../../../../../components/layouts/tab/tab.tsx"
import { CreateOneIncomeStatement } from "./CreateOneIncomeStatement.tsx"
import { IncomeStatementsTable } from "./IncomeStatementsTable.tsx"

export function IncomeStatementsPage({
    idOrganization: idOrganizationProp,
    idYear: idYearProp,
}: {
    idOrganization?: string
    idYear?: string
} = {}) {
    const params = useParams({
        strict: false,
    }) as {
        idOrganization?: string
        idYear?: string
    }
    const idOrganization = idOrganizationProp ?? params.idOrganization ?? ""
    const idYear = idYearProp ?? params.idYear ?? ""
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
                                idOrganization: idOrganization,
                                idYear: idYear,
                            },
                        },
                        {
                            label: "Calculs",
                            icon: <IconCalculator />,
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/calculs",
                            params: {
                                idOrganization: idOrganization,
                                idYear: idYear,
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
                        idOrganization={idOrganization}
                        idYear={idYear}
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
                        className={{
                            maxWidth: "[320px]",
                        }}
                    />
                </InputDebounced>
                <Box
                    className={css({
                        maxH: "[640px]",
                        overflowY: "auto",
                    })}
                >
                    <IncomeStatementsTable
                        idOrganization={idOrganization}
                        idYear={idYear}
                        globalFilter={globalFilter}
                    />
                </Box>
            </Section.Item>
        </Section.Root>
    )
}
