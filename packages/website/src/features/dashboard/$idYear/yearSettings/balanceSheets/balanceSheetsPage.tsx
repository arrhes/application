import { ButtonPlainContent, InputDebounced, InputText } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus, IconScale } from "@tabler/icons-react"
import { useParams, useRouterState } from "@tanstack/react-router"
import { useCallback, useState, useTransition } from "react"
import { Box } from "../../../../../components/layouts/box.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { Tab } from "../../../../../components/layouts/tab/tab.tsx"
import { balanceSheetsLayoutRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsLayoutRoute.tsx"
import { BalanceSheetTable } from "./balanceSheetTable.tsx"
import { CreateOneBalanceSheet } from "./createOneBalanceSheet.tsx"

export function BalanceSheetsPage() {
    const params = useParams({ from: balanceSheetsLayoutRoute.id })
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
        <Page.Root>
            <Page.Content>
                <Section.Root>
                    <Section.Item>
                        <Tab.Root
                            tabs={[
                                {
                                    label: "Actif",
                                    icon: <IconScale />,
                                    to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/bilan/actif",
                                    params: {
                                        idOrganization: params.idOrganization,
                                        idYear: params.idYear,
                                    },
                                },
                                {
                                    label: "Passif",
                                    icon: <IconScale />,
                                    to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/bilan/passif",
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
                            <CreateOneBalanceSheet idOrganization={params.idOrganization} idYear={params.idYear}>
                                <ButtonPlainContent leftIcon={<IconPlus />} text="Ajouter une ligne de bilan" />
                            </CreateOneBalanceSheet>
                        </div>
                        <InputDebounced value={globalFilter ?? ""} onChange={handleFilterChange}>
                            <InputText placeholder="Recherche" className={css({ maxWidth: "[320px]" })} />
                        </InputDebounced>
                        <Box className={css({ padding: "4", gap: "4", maxH: "[640px]", overflowY: "auto" })}>
                            <BalanceSheetTable
                                idOrganization={params.idOrganization}
                                idYear={params.idYear}
                                side={side}
                                globalFilter={globalFilter}
                            />
                        </Box>
                    </Section.Item>
                </Section.Root>
            </Page.Content>
        </Page.Root>
    )
}
