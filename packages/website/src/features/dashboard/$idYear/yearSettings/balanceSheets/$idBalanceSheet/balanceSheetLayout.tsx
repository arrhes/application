import { readOneBalanceSheetRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconDatabase, IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons-react"
import { Outlet, useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"
import { Tab } from "../../../../../../components/layouts/tab/tab.tsx"
import { LinkButton } from "../../../../../../components/linkButton.tsx"
import { balanceSheetLayoutRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetLayoutRoute.tsx"
import { DeleteOneBalanceSheet } from "./deleteOneBalanceSheet.tsx"
import { UpdateOneBalanceSheet } from "./updateOneBalanceSheet.tsx"

export function BalanceSheetLayout() {
    const params = useParams({
        from: balanceSheetLayoutRoute.id,
    })

    return (
        <Section.Root>
            <DataWrapper
                routeDefinition={readOneBalanceSheetRouteDefinition}
                body={{
                    idYear: params.idYear,
                    idBalanceSheet: params.idBalanceSheet,
                }}
            >
                {(balanceSheet) => {
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
                                        to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/bilan"
                                        params={{
                                            idOrganization: balanceSheet.idOrganization,
                                            idYear: balanceSheet.idYear,
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
                                    <UpdateOneBalanceSheet balanceSheet={balanceSheet}>
                                        <ButtonPlainContent
                                            leftIcon={<IconPencil />}
                                            text="Modifier"
                                        />
                                    </UpdateOneBalanceSheet>
                                    <DeleteOneBalanceSheet balanceSheet={balanceSheet}>
                                        <ButtonOutlineContent
                                            leftIcon={<IconTrash />}
                                            color="danger"
                                        />
                                    </DeleteOneBalanceSheet>
                                </div>
                            </Section.Item>
                            <Section.Item>
                                <Tab.Root
                                    tabs={[
                                        {
                                            label: "Informations",
                                            icon: <IconInfoCircle />,
                                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/bilan/$idBalanceSheet",
                                            params: {
                                                idOrganization: params.idOrganization,
                                                idYear: params.idYear,
                                                idBalanceSheet: params.idBalanceSheet,
                                            },
                                        },
                                        {
                                            label: "Métadonnées",
                                            icon: <IconDatabase />,
                                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/bilan/$idBalanceSheet/métadonnées",
                                            params: {
                                                idOrganization: params.idOrganization,
                                                idYear: params.idYear,
                                                idBalanceSheet: params.idBalanceSheet,
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
