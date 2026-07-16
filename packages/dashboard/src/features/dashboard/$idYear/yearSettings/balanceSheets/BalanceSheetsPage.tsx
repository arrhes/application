import { ButtonPlainContent, InputDebounced, InputText } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus, IconScale } from "@tabler/icons-react"
import { useParams, useRouterState } from "@tanstack/react-router"
import { useCallback, useState, useTransition } from "react"
import { Box } from "../../../../../components/layouts/Box.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { Tab } from "../../../../../components/layouts/tab/tab.tsx"
import { BalanceSheetTable } from "./BalanceSheetTable.tsx"
import { CreateOneBalanceSheet } from "./CreateOneBalanceSheet.tsx"

export function BalanceSheetsPage({
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
    const pathname = useRouterState({
        select: (state) => state.location.pathname,
    })
    const side = pathname.endsWith("/passif") ? "liability" : "asset"

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
                                    label: "Actif",
                                    icon: <IconScale />,
                                    to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/bilan/actif",
                                    params: {
                                        idOrganization: idOrganization,
                                        idYear: idYear,
                                    },
                                },
                                {
                                    label: "Passif",
                                    icon: <IconScale />,
                                    to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/bilan/passif",
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
                            <CreateOneBalanceSheet
                                idOrganization={idOrganization}
                                idYear={idYear}
                            >
                                <ButtonPlainContent
                                    leftIcon={<IconPlus />}
                                    text="Ajouter une ligne de bilan"
                                />
                            </CreateOneBalanceSheet>
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
                                padding: "4",
                                gap: "4",
                                maxH: "[640px]",
                                overflowY: "auto",
                            })}
                        >
                            <BalanceSheetTable
                                idOrganization={idOrganization}
                                idYear={idYear}
                                side={side}
                                globalFilter={globalFilter}
                            />
                        </Box>
                    </Section.Item>
                </Section.Root>
    )
}
