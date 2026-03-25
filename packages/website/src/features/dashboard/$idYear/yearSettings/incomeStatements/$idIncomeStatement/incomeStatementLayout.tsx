import { readOneIncomeStatementRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconDatabase, IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons-react"
import { Outlet, useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"
import { Tab } from "../../../../../../components/layouts/tab/tab.tsx"
import { LinkButton } from "../../../../../../components/linkButton.tsx"
import { incomeStatementLayoutRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementLayoutRoute.tsx"
import { DeleteOneIncomeStatement } from "./deleteOneIncomeStatement.tsx"
import { UpdateOneIncomeStatement } from "./updateOneIncomeStatement.tsx"

export function IncomeStatementLayout() {
    const params = useParams({ from: incomeStatementLayoutRoute.id })

    return (
        <Section.Root>
            <DataWrapper
                routeDefinition={readOneIncomeStatementRouteDefinition}
                body={{
                    idYear: params.idYear,
                    idIncomeStatement: params.idIncomeStatement,
                }}
            >
                {(incomeStatement) => {
                    return (
                        <>
                            <Section.Item className={css({ flexDirection: "row" })}>
                                <div
                                    className={css({
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    })}
                                >
                                    <LinkButton
                                        to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat"
                                        params={{
                                            idOrganization: incomeStatement.idOrganization,
                                            idYear: incomeStatement.idYear,
                                        }}
                                    >
                                        <ButtonOutlineContent leftIcon={<IconChevronLeft />} text="Retour" />
                                    </LinkButton>
                                </div>
                                <div
                                    className={css({
                                        ml: "auto",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    })}
                                >
                                    <UpdateOneIncomeStatement incomeStatement={incomeStatement}>
                                        <ButtonPlainContent leftIcon={<IconPencil />} text="Modifier" />
                                    </UpdateOneIncomeStatement>
                                    <DeleteOneIncomeStatement incomeStatement={incomeStatement}>
                                        <ButtonOutlineContent leftIcon={<IconTrash />} color="danger" />
                                    </DeleteOneIncomeStatement>
                                </div>
                            </Section.Item>
                            <Section.Item>
                                <Tab.Root
                                    tabs={[
                                        {
                                            label: "Informations",
                                            icon: <IconInfoCircle />,
                                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/$idIncomeStatement",
                                            params: {
                                                idOrganization: params.idOrganization,
                                                idYear: params.idYear,
                                                idIncomeStatement: params.idIncomeStatement,
                                            },
                                        },
                                        {
                                            label: "Métadonnées",
                                            icon: <IconDatabase />,
                                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/$idIncomeStatement/métadonnées",
                                            params: {
                                                idOrganization: params.idOrganization,
                                                idYear: params.idYear,
                                                idIncomeStatement: params.idIncomeStatement,
                                            },
                                        },
                                    ]}
                                />
                            </Section.Item>
                            <Outlet />
                        </>
                    )
                }}
            </DataWrapper>
        </Section.Root>
    )
}
