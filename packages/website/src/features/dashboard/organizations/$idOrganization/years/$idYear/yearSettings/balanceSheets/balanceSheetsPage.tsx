import { ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconLine, IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../../../../../components/layouts/box.tsx"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { balanceSheetsRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsRoute.tsx"
import { BalanceSheetTable } from "./balanceSheetTable.tsx"
import { ConnectAccountsToBalanceSheets } from "./connectAccountsToBalanceSheets.tsx"
import { CreateOneBalanceSheet } from "./createOneBalanceSheet.tsx"
import { GenerateBalanceSheets } from "./generateBalanceSheets.tsx"

export function BalanceSheetsPage() {
    const params = useParams({ from: balanceSheetsRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <Section.Root>
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
                            <GenerateBalanceSheets idOrganization={params.idOrganization} idYear={params.idYear}>
                                <ButtonOutlineContent
                                    leftIcon={<IconPlus />}
                                    text="Générer les lignes de bilan par défaut"
                                />
                            </GenerateBalanceSheets>
                            <ConnectAccountsToBalanceSheets
                                idOrganization={params.idOrganization}
                                idYear={params.idYear}
                            >
                                <ButtonOutlineContent
                                    leftIcon={<IconLine />}
                                    text="Connecter les comptes aux lignes de bilan par défaut"
                                />
                            </ConnectAccountsToBalanceSheets>
                        </div>
                        <Box className={css({ padding: "4", gap: "4", maxH: "[640px]", overflowY: "auto" })}>
                            <BalanceSheetTable idOrganization={params.idOrganization} idYear={params.idYear} />
                        </Box>
                    </Section.Item>
                </Section.Root>
            </Page.Content>
        </Page.Root>
    )
}
