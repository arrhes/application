import { readOneAccountRouteDefinition, readOneEntryLineRouteDefinition } from "@arrhes/application-metadata/routes"
import { FormatBoolean, FormatNull, FormatPrice, FormatText } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { DataBlock } from "../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../components/layouts/DataWrapper.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"


export function EntryLinePage() {
    const params = useParams({
        strict: false,
    }) as { idYear?: string; idEntryLine?: string }

    return (
        <DataWrapper
            routeDefinition={readOneEntryLineRouteDefinition}
            body={{
                idYear: params.idYear,
                idEntryLine: params.idEntryLine,
            }}
        >
            {(entryLine) => {
                return (
                    <Section.Item
                        className={css({
                            flexDirection: "column",
                        })}
                    >
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
                                    <FormatBoolean boolean={entryLine.isComputedForBalanceSheetReport} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Calculé pour le compte de résultat ?">
                                    <FormatBoolean boolean={entryLine.isComputedForIncomeStatementReport} />
                                </DataBlock.Item>
                            </DataBlock.Content>
                        </DataBlock.Root>
                    </Section.Item>
                )
            }}
        </DataWrapper>
    )
}
