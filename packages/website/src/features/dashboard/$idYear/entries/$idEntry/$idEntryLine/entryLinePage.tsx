import { readOneAccountRouteDefinition, readOneEntryLineRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonGhostContent, ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconDatabase, IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { FormatBoolean } from "../../../../../../components/formats/formatBoolean.tsx"
import { FormatDateTime } from "../../../../../../components/formats/formatDateTime.tsx"
import { FormatNull } from "../../../../../../components/formats/formatNull.tsx"
import { FormatPrice } from "../../../../../../components/formats/formatPrice.tsx"
import { FormatText } from "../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"
import { LinkButton } from "../../../../../../components/linkButton.tsx"
import { entryLineRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/entries/$idEntry/$idEntryLine/entryLineRoute.tsx"
import { DeleteOneEntryLine } from "./deleteOneEntryLine.tsx"
import { UpdateOneEntryLine } from "./updateOneEntryLine.tsx"

export function EntryLinePage() {
    const [activeTab, setActiveTab] = useState<"informations" | "metadata">("informations")
    const params = useParams({ from: entryLineRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOneEntryLineRouteDefinition}
                    body={{
                        idYear: params.idYear,
                        idEntryLine: params.idEntryLine,
                    }}
                >
                    {(entryLine) => {
                        return (
                            <Section.Root>
                                <Section.Item>
                                    <div
                                        className={css({
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            gap: "0.5rem",
                                        })}
                                    >
                                        <LinkButton
                                            to="/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idEntry"
                                            params={{
                                                idOrganization: entryLine.idOrganization,
                                                idYear: entryLine.idYear,
                                                idEntry: entryLine.idEntry,
                                            }}
                                        >
                                            <ButtonOutlineContent leftIcon={<IconChevronLeft />} text="Retour" />
                                        </LinkButton>
                                        <div
                                            className={css({
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                            })}
                                        >
                                            <UpdateOneEntryLine entryLine={entryLine}>
                                                <ButtonPlainContent leftIcon={<IconPencil />} text="Modifier" />
                                            </UpdateOneEntryLine>
                                            <DeleteOneEntryLine entryLine={entryLine}>
                                                <ButtonOutlineContent leftIcon={<IconTrash />} color="danger" />
                                            </DeleteOneEntryLine>
                                        </div>
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
                                                <DataBlock.Item label="Libellé">
                                                    <FormatText>{entryLine.label}</FormatText>
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Compte">
                                                    {entryLine.idAccount === null ? (
                                                        <FormatNull />
                                                    ) : (
                                                        <DataWrapper
                                                            routeDefinition={readOneAccountRouteDefinition}
                                                            body={{
                                                                idYear: params.idYear,
                                                                idAccount: entryLine.idAccount,
                                                            }}
                                                        >
                                                            {(account) => (
                                                                <FormatText>{`${account.number} - ${account.label}`}</FormatText>
                                                            )}
                                                        </DataWrapper>
                                                    )}
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Débit">
                                                    <FormatPrice price={entryLine.debit} />
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Crédit">
                                                    <FormatPrice price={entryLine.credit} />
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Calculé pour le journal ?">
                                                    <FormatBoolean boolean={entryLine.isComputedForJournalReport} />
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Calculé pour le grand-livre ?">
                                                    <FormatBoolean boolean={entryLine.isComputedForLedgerReport} />
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Calculé pour la balance ?">
                                                    <FormatBoolean boolean={entryLine.isComputedForBalanceReport} />
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Calculé pour le bilan ?">
                                                    <FormatBoolean
                                                        boolean={entryLine.isComputedForBalanceSheetReport}
                                                    />
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Calculé pour le compte de résultat ?">
                                                    <FormatBoolean
                                                        boolean={entryLine.isComputedForIncomeStatementReport}
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
                                                    <FormatDateTime date={entryLine.createdAt} />
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Modifié le">
                                                    <FormatDateTime date={entryLine.lastUpdatedAt} />
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Id">
                                                    <FormatText>{entryLine.id}</FormatText>
                                                </DataBlock.Item>
                                            </DataBlock.Content>
                                        </DataBlock.Root>
                                    </Section.Item>
                                )}
                            </Section.Root>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
