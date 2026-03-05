import { readOneComputationRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonGhostContent, ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import {
    IconChevronLeft,
    IconDatabase,
    IconInfoCircle,
    IconList,
    IconPencil,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { FormatDateTime } from "../../../../../../../components/formats/formatDateTime.tsx"
import { FormatText } from "../../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../components/layouts/section/section.tsx"
import { LinkButton } from "../../../../../../../components/linkButton.tsx"

import { computationLayoutRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationLayoutRoute.tsx"
import { ComputationIncomeStatementsTable } from "./computationIncomeStatements/computationIncomeStatementTable.tsx"
import { CreateOneComputationIncomeStatement } from "./computationIncomeStatements/createOneComputationIncomeStatement.tsx"
import { DeleteOneComputation } from "./deleteOneComputation.tsx"
import { UpdateOneComputation } from "./updateOneComputation.tsx"

export function ComputationPage() {
    const [activeTab, setActiveTab] = useState<"informations" | "postes" | "metadata">("informations")
    const params = useParams({ from: computationLayoutRoute.id })

    return (
        <Section.Root>
            <DataWrapper
                routeDefinition={readOneComputationRouteDefinition}
                body={{
                    idYear: params.idYear,
                    idComputation: params.idComputation,
                }}
            >
                {(computation) => {
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
                                    <UpdateOneComputation computation={computation}>
                                        <ButtonPlainContent leftIcon={<IconPencil />} text="Modifier" />
                                    </UpdateOneComputation>
                                    <DeleteOneComputation computation={computation}>
                                        <ButtonOutlineContent leftIcon={<IconTrash />} color="danger" />
                                    </DeleteOneComputation>
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
                                    <button type="button" onClick={() => setActiveTab("postes")}>
                                        <ButtonGhostContent
                                            leftIcon={<IconList />}
                                            text="Postes"
                                            color="neutral"
                                            isCurrent={activeTab === "postes"}
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
                                            <DataBlock.Item label="Numéro">
                                                <FormatText>{computation.number}</FormatText>
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Libellé">
                                                <FormatText>{computation.label}</FormatText>
                                            </DataBlock.Item>
                                        </DataBlock.Content>
                                    </DataBlock.Root>
                                </Section.Item>
                            ) : activeTab === "metadata" ? (
                                <Section.Item className={css({ flexDirection: "column" })}>
                                    <DataBlock.Root>
                                        <DataBlock.Header title="Métadonnées" />
                                        <DataBlock.Content>
                                            <DataBlock.Item label="Ajouté le">
                                                <FormatDateTime date={computation.createdAt} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Modifié le">
                                                <FormatDateTime date={computation.lastUpdatedAt} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Id">
                                                <FormatText>{computation.id}</FormatText>
                                            </DataBlock.Item>
                                        </DataBlock.Content>
                                    </DataBlock.Root>
                                </Section.Item>
                            ) : (
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
                                        <CreateOneComputationIncomeStatement computation={computation}>
                                            <ButtonPlainContent leftIcon={<IconPlus />} text="Ajouter" />
                                        </CreateOneComputationIncomeStatement>
                                    </div>
                                    <ComputationIncomeStatementsTable computation={computation} />
                                </Section.Item>
                            )}
                        </>
                    )
                }}
            </DataWrapper>
        </Section.Root>
    )
}
