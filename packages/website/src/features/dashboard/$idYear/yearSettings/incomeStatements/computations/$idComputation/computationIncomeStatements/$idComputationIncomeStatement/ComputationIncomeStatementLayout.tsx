import { readOneComputationIncomeStatementRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconDatabase, IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons-react"
import { Outlet, useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../../../../../components/layouts/DataWrapper.tsx"
import { Section } from "../../../../../../../../../components/layouts/section/section.tsx"
import { Tab } from "../../../../../../../../../components/layouts/tab/tab.tsx"
import { LinkButton } from "../../../../../../../../../components/LinkButton.tsx"

import { DeleteOneComputationIncomeStatement } from "./DeleteOneComputationIncomeStatement.tsx"
import { UpdateOneComputationIncomeStatement } from "./UpdateOneComputationIncomeStatement.tsx"

export function ComputationIncomeStatementLayout() {
    const params = useParams({
        strict: false,
    }) as { idYear?: string; idComputationIncomeStatement?: string }

    return (
        <Section.Root>
            <DataWrapper
                routeDefinition={readOneComputationIncomeStatementRouteDefinition}
                body={{
                    idYear: params.idYear,
                    idComputationIncomeStatement: params.idComputationIncomeStatement,
                }}
            >
                {(computationIncomeStatement) => {
                    return (
                        <>
                            <Section.Item
                                className={css({
                                    flexDirection: "row",
                                })}
                            >
                                <div
                                    className={css({
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    })}
                                >
                                    <LinkButton
                                        to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/calculs/$idComputation/postes"
                                        params={{
                                            idOrganization: params.idOrganization,
                                            idYear: params.idYear,
                                            idComputation: params.idComputation,
                                        }}
                                    >
                                        <ButtonOutlineContent
                                            leftIcon={<IconChevronLeft />}
                                            text="Retour"
                                        />
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
                                    <UpdateOneComputationIncomeStatement
                                        computationIncomeStatement={computationIncomeStatement}
                                    >
                                        <ButtonPlainContent
                                            leftIcon={<IconPencil />}
                                            text="Modifier"
                                        />
                                    </UpdateOneComputationIncomeStatement>
                                    <DeleteOneComputationIncomeStatement
                                        computationIncomeStatement={computationIncomeStatement}
                                    >
                                        <ButtonOutlineContent
                                            leftIcon={<IconTrash />}
                                            color="danger"
                                        />
                                    </DeleteOneComputationIncomeStatement>
                                </div>
                            </Section.Item>
                            <Section.Item>
                                <Tab.Root
                                    tabs={[
                                        {
                                            label: "Informations",
                                            icon: <IconInfoCircle />,
                                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/calculs/$idComputation/postes/$idComputationIncomeStatement",
                                            params: {
                                                idOrganization: params.idOrganization,
                                                idYear: params.idYear,
                                                idComputation: params.idComputation,
                                                idComputationIncomeStatement: params.idComputationIncomeStatement,
                                            },
                                        },
                                        {
                                            label: "Métadonnées",
                                            icon: <IconDatabase />,
                                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/calculs/$idComputation/postes/$idComputationIncomeStatement/métadonnées",
                                            params: {
                                                idOrganization: params.idOrganization,
                                                idYear: params.idYear,
                                                idComputation: params.idComputation,
                                                idComputationIncomeStatement: params.idComputationIncomeStatement,
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
