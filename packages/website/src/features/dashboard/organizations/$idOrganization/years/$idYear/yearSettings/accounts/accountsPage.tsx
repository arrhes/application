import { ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useCallback, useState, useTransition } from "react"
import { InputDebounced } from "../../../../../../../../components/inputs/inputDebounced.tsx"
import { InputText } from "../../../../../../../../components/inputs/inputText.tsx"
import { Box } from "../../../../../../../../components/layouts/box.tsx"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { accountsRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsRoute.tsx"
import { AccountsTable } from "./accountsTable.tsx"
import { CreateOneAccount } from "./createOneAccount.tsx"
import { GenerateAccounts } from "./generateAccounts.tsx"

export function AccountsPage() {
    const params = useParams({ from: accountsRoute.id })

    const [globalFilter, setGlobalFilter] = useState("")
    const [, startTransition] = useTransition()

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
                        <div
                            className={css({
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <CreateOneAccount idOrganization={params.idOrganization} idYear={params.idYear}>
                                <ButtonPlainContent leftIcon={<IconPlus />} text="Ajouter un compte" />
                            </CreateOneAccount>
                            <GenerateAccounts idOrganization={params.idOrganization} idYear={params.idYear}>
                                <ButtonOutlineContent leftIcon={<IconPlus />} text="Générer les comptes par défaut" />
                            </GenerateAccounts>
                        </div>
                        <InputDebounced value={globalFilter ?? ""} onChange={handleFilterChange}>
                            <InputText placeholder="Recherche" className={css({ maxWidth: "[320px]" })} />
                        </InputDebounced>
                        <Box className={css({ maxH: "640px" })}>
                            <AccountsTable
                                idOrganization={params.idOrganization}
                                idYear={params.idYear}
                                globalFilter={globalFilter}
                            />
                        </Box>
                    </Section.Item>
                </Section.Root>
            </Page.Content>
        </Page.Root>
    )
}
