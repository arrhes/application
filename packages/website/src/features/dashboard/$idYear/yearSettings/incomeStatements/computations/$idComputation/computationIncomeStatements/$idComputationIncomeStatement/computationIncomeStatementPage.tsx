import {
    readOneComputationIncomeStatementRouteDefinition,
    readOneComputationRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { ButtonGhostContent, ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconDatabase, IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { FormatDateTime } from "../../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatText } from "../../../../../../../../../components/formats/formatText.tsx"
import { Chip } from "../../../../../../../../../components/layouts/chip.tsx"
import { DataBlock } from "../../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../../../components/layouts/section/section.tsx"
import { LinkButton } from "../../../../../../../../../components/linkButton.tsx"

import { computationIncomeStatementLayoutRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/$idComputationIncomeStatement/computationIncomeStatementLayoutRoute.tsx"
import { DeleteOneComputationIncomeStatement } from "./deleteOneComputationIncomeStatement.tsx"
import { UpdateOneComputationIncomeStatement } from "./updateOneComputationIncomeStatement.tsx"

export function ComputationIncomeStatementPage() {
    const [activeTab, setActiveTab] = useState<"informations" | "metadata">("informations")
    const params = useParams({ from: computationIncomeStatementLayoutRoute.id })

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
                                        to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/calculs"
                                        params={{
                                            idOrganization: params.idOrganization,
                                            idYear: params.idYear,
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
                                    <UpdateOneComputationIncomeStatement
                                        computationIncomeStatement={computationIncomeStatement}
                                    >
                                        <ButtonPlainContent leftIcon={<IconPencil />} text="Modifier" />
                                    </UpdateOneComputationIncomeStatement>
                                    <DeleteOneComputationIncomeStatement
                                        computationIncomeStatement={computationIncomeStatement}
                                    >
                                        <ButtonOutlineContent leftIcon={<IconTrash />} color="danger" />
                                    </DeleteOneComputationIncomeStatement>
                                </div>
                            </Section.Item>
                            <Section.Item>
                                <div
                                    className={css({
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        borderBottom: "1px solid",
                                        borderBottomColor: "neutral/5",
                                        paddingBottom: "0.5rem",
                                    })}
                                >
                                    <button type="button" onClick={() => setActiveTab("informations")}>
                                        <ButtonGhostContent
                                            leftIcon={<IconInfoCircle />}
                                            text="Informations"
                                            color="neutral"
                                            isCurrent={activeTab === "informations"}
                                        />
                                    </button>
                                    <button type="button" onClick={() => setActiveTab("metadata")}>
                                        <ButtonGhostContent
                                            leftIcon={<IconDatabase />}
                                            text="Métadonnées"
                                            color="neutral"
                                            isCurrent={activeTab === "metadata"}
                                        />
                                    </button>
                                </div>
                            </Section.Item>
                            {activeTab === "informations" ? (
                                <Section.Item className={css({ flexDirection: "column" })}>
                                    <DataBlock.Root>
                                        <DataBlock.Header title="Informations" />
                                        <DataBlock.Content>
                                            <DataBlock.Item label="Poste du compte de résultat">
                                                <DataWrapper
                                                    routeDefinition={readOneComputationRouteDefinition}
                                                    body={{
                                                        idYear: computationIncomeStatement.idYear,
                                                        idComputation: computationIncomeStatement.idComputation,
                                                    }}
                                                >
                                                    {(computation) => (
                                                        <FormatText>
                                                            {`${computation.number} - ${computation.label}`}
                                                        </FormatText>
                                                    )}
                                                </DataWrapper>
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Opération">
                                                <Chip
                                                    text={
                                                        computationIncomeStatement.operation === "plus"
                                                            ? "Addition"
                                                            : "Soustraction"
                                                    }
                                                />
                                            </DataBlock.Item>
                                        </DataBlock.Content>
                                    </DataBlock.Root>
                                </Section.Item>
                            ) : (
                                <Section.Item className={css({ flexDirection: "column" })}>
                                    <DataBlock.Root>
                                        <DataBlock.Header title="Métadonnées" />
                                        <DataBlock.Content>
                                            <DataBlock.Item label="Ajouté le">
                                                <FormatDateTime date={computationIncomeStatement.createdAt} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Modifié le">
                                                <FormatDateTime date={computationIncomeStatement.lastUpdatedAt} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Id">
                                                <FormatText>{computationIncomeStatement.id}</FormatText>
                                            </DataBlock.Item>
                                        </DataBlock.Content>
                                    </DataBlock.Root>
                                </Section.Item>
                            )}
                        </>
                    )
                }}
            </DataWrapper>
        </Section.Root>
    )
}
