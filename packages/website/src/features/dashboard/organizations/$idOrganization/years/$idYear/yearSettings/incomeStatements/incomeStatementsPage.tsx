import { ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconLine, IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../../../../../components/layouts/box.tsx"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { incomeStatementsRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsRoute.tsx"
import { ComputationsTable } from "./computations/computationsTable.tsx"
import { CreateOneComputation } from "./computations/createOneComputation.tsx"
import { GenerateComputations } from "./computations/generateComputations.tsx"
import { ConnectAccountsToIncomeStatements } from "./connectAccountsToIncomeStatements.tsx"
import { CreateOneIncomeStatement } from "./createOneIncomeStatement.tsx"
import { GenerateIncomeStatements } from "./generateIncomeStatement.tsx"
import { IncomeStatementsTable } from "./incomeStatementsTable.tsx"

export function IncomeStatementsPage() {
    const params = useParams({ from: incomeStatementsRoute.id })

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
                            <CreateOneIncomeStatement idOrganization={params.idOrganization} idYear={params.idYear}>
                                <ButtonPlainContent
                                    leftIcon={<IconPlus />}
                                    text="Ajouter une ligne de compte de résultat"
                                />
                            </CreateOneIncomeStatement>
                            <GenerateIncomeStatements idOrganization={params.idOrganization} idYear={params.idYear}>
                                <ButtonOutlineContent
                                    leftIcon={<IconPlus />}
                                    text="Générer les lignes de compte de résultat par défaut"
                                />
                            </GenerateIncomeStatements>
                            <ConnectAccountsToIncomeStatements
                                idOrganization={params.idOrganization}
                                idYear={params.idYear}
                            >
                                <ButtonOutlineContent
                                    leftIcon={<IconLine />}
                                    text="Connecter les comptes aux lignes de compte de résultat par défaut"
                                />
                            </ConnectAccountsToIncomeStatements>
                        </div>
                        <Box className={css({ maxH: "[640px]", overflowY: "auto" })}>
                            <IncomeStatementsTable idOrganization={params.idOrganization} idYear={params.idYear} />
                        </Box>
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
                            <CreateOneComputation idOrganization={params.idOrganization} idYear={params.idYear}>
                                <ButtonPlainContent leftIcon={<IconPlus />} text="Ajouter une ligne de calcul" />
                            </CreateOneComputation>
                            <GenerateComputations idOrganization={params.idOrganization} idYear={params.idYear}>
                                <ButtonOutlineContent leftIcon={<IconPlus />} text="Générer les calculs par défaut" />
                            </GenerateComputations>
                        </div>
                        <Box className={css({ maxH: "[640px]", overflowY: "auto" })}>
                            <ComputationsTable idOrganization={params.idOrganization} idYear={params.idYear} />
                        </Box>
                    </Section.Item>
                </Section.Root>
            </Page.Content>
        </Page.Root>
    )
}
