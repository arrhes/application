import {
    closeYearRouteDefinition,
    computeOneEntryRouteDefinition,
    createOneAccountRouteDefinition,
    createOneBalanceSheetRouteDefinition,
    createOneComputationIncomeStatementRouteDefinition,
    createOneComputationRouteDefinition,
    createOneEntryFromTemplateRouteDefinition,
    createOneEntryLineRouteDefinition,
    createOneEntryRouteDefinition,
    createOneIncomeStatementRouteDefinition,
    createOneJournalRouteDefinition,
    createOneTagRouteDefinition,
    deleteOneAccountRouteDefinition,
    deleteOneBalanceSheetRouteDefinition,
    deleteOneComputationIncomeStatementRouteDefinition,
    deleteOneComputationRouteDefinition,
    deleteOneEntryLineRouteDefinition,
    deleteOneEntryRouteDefinition,
    deleteOneIncomeStatementRouteDefinition,
    deleteOneJournalRouteDefinition,
    deleteOneTagRouteDefinition,
    deleteOneYearRouteDefinition,
    duplicateOneEntryRouteDefinition,
    openYearRouteDefinition,
    readAllAccountsRouteDefinition,
    readAllBalanceSheetsRouteDefinition,
    readAllComputationIncomeStatementsRouteDefinition,
    readAllComputationsRouteDefinition,
    readAllEntriesRouteDefinition,
    readAllEntryLinesRouteDefinition,
    readAllIncomeStatementsRouteDefinition,
    readAllJournalsRouteDefinition,
    readAllTagsRouteDefinition,
    readOneAccountRouteDefinition,
    readOneBalanceSheetRouteDefinition,
    readOneComputationIncomeStatementRouteDefinition,
    readOneComputationRouteDefinition,
    readOneEntryLineRouteDefinition,
    readOneEntryRouteDefinition,
    readOneIncomeStatementRouteDefinition,
    readOneJournalRouteDefinition,
    readOneTagRouteDefinition,
    readOneYearRouteDefinition,
    settleBalanceSheetRouteDefinition,
    settleIncomeStatementRouteDefinition,
    updateManyEntryLinesRouteDefinition,
    updateOneAccountRouteDefinition,
    updateOneBalanceSheetRouteDefinition,
    updateOneComputationIncomeStatementRouteDefinition,
    updateOneComputationRouteDefinition,
    updateOneEntryLineRouteDefinition,
    updateOneEntryRouteDefinition,
    updateOneIncomeStatementRouteDefinition,
    updateOneJournalRouteDefinition,
    updateOneTagRouteDefinition,
    updateOneYearRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocNextPage } from "../../../components/document/docNextPage.tsx"
import { DocParagraph } from "../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocRouteRequest } from "../../../components/document/docRouteRequest.tsx"
import { DocSection } from "../../../components/document/docSection.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"

export function YearApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Exercice"
                description="Paramètres d'exercice, comptes, journaux, bilans, comptes de résultat, calculs, écritures et lignes d'écriture"
            />

            <DocSection title="Paramètres d'exercice">
                <DocParagraph>
                    Routes de lecture, modification, clôture et ouverture d'un exercice comptable.
                </DocParagraph>
                <DocRouteRequest routeDefinition={readOneYearRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneYearRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneYearRouteDefinition} />
                <DocRouteRequest routeDefinition={closeYearRouteDefinition} />
                <DocRouteRequest routeDefinition={openYearRouteDefinition} />
                <DocRouteRequest routeDefinition={settleBalanceSheetRouteDefinition} />
                <DocRouteRequest routeDefinition={settleIncomeStatementRouteDefinition} />
                <DocTip variant="warning">
                    La clôture d'un exercice empêche toute modification ultérieure des écritures.
                </DocTip>
            </DocSection>

            <DocSection title="Comptes">
                <DocParagraph>
                    Le plan comptable de l'organisation. Les comptes sont organisés en arborescence avec des classes (1
                    à 7) à la racine.
                </DocParagraph>
                <DocRouteRequest routeDefinition={createOneAccountRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllAccountsRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneAccountRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneAccountRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneAccountRouteDefinition} />
            </DocSection>

            <DocSection title="Journaux">
                <DocParagraph>Les journaux comptables regroupent les écritures par type d'opération.</DocParagraph>
                <DocRouteRequest routeDefinition={createOneJournalRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllJournalsRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneJournalRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneJournalRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneJournalRouteDefinition} />
            </DocSection>

            <DocSection title="Bilans">
                <DocParagraph>
                    Structure du bilan comptable (actif et passif). Les lignes de bilan sont liées aux comptes pour
                    calculer automatiquement les soldes.
                </DocParagraph>
                <DocRouteRequest routeDefinition={createOneBalanceSheetRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllBalanceSheetsRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneBalanceSheetRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneBalanceSheetRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneBalanceSheetRouteDefinition} />
            </DocSection>

            <DocSection title="Comptes de résultat">
                <DocParagraph>
                    Structure du compte de résultat. Fonctionne de manière similaire aux bilans.
                </DocParagraph>
                <DocRouteRequest routeDefinition={createOneIncomeStatementRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllIncomeStatementsRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneIncomeStatementRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneIncomeStatementRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneIncomeStatementRouteDefinition} />
            </DocSection>

            <DocSection title="Libellés d'écriture">
                <DocParagraph>
                    Les libellés permettent de catégoriser les écritures comptables avec des étiquettes réutilisables.
                </DocParagraph>
                <DocRouteRequest routeDefinition={createOneTagRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllTagsRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneTagRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneTagRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneTagRouteDefinition} />
            </DocSection>

            <DocSection title="Calculs">
                <DocParagraph>
                    Les calculs sont des formules personnalisées qui combinent des lignes de compte de résultat pour
                    produire des valeurs dérivées (par exemple le résultat d'exploitation).
                </DocParagraph>
                <DocRouteRequest routeDefinition={createOneComputationRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllComputationsRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneComputationRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneComputationRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneComputationRouteDefinition} />
            </DocSection>

            <DocSection title="Calculs - comptes de résultat">
                <DocParagraph>
                    Liens entre les calculs et les lignes de compte de résultat. Chaque lien définit si la ligne est
                    ajoutée ou soustraite dans le calcul.
                </DocParagraph>
                <DocRouteRequest routeDefinition={createOneComputationIncomeStatementRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllComputationIncomeStatementsRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneComputationIncomeStatementRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneComputationIncomeStatementRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneComputationIncomeStatementRouteDefinition} />
            </DocSection>

            <DocSection title="Écritures">
                <DocParagraph>
                    Les écritures comptables sont les opérations enregistrées dans les journaux. Chaque écriture
                    contient une ou plusieurs lignes (débit/crédit).
                </DocParagraph>
                <DocRouteRequest routeDefinition={createOneEntryRouteDefinition} />
                <DocRouteRequest
                    routeDefinition={createOneEntryFromTemplateRouteDefinition}
                    description="Créer une écriture avec des lignes pré-remplies en une seule requête."
                />
                <DocRouteRequest routeDefinition={readAllEntriesRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneEntryRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneEntryRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneEntryRouteDefinition} />
                <DocRouteRequest routeDefinition={duplicateOneEntryRouteDefinition} />
                <DocRouteRequest routeDefinition={computeOneEntryRouteDefinition} />
            </DocSection>

            <DocSection title="Lignes d'écriture">
                <DocParagraph>
                    Chaque ligne d'écriture représente un mouvement de débit ou de crédit sur un compte.
                </DocParagraph>
                <DocRouteRequest routeDefinition={createOneEntryLineRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllEntryLinesRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneEntryLineRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneEntryLineRouteDefinition} />
                <DocRouteRequest
                    routeDefinition={updateManyEntryLinesRouteDefinition}
                    description="Modifier en masse toutes les lignes d'une écriture."
                />
                <DocRouteRequest routeDefinition={deleteOneEntryLineRouteDefinition} />
            </DocSection>

            <DocNextPage
                to="/documentation/api/stockage"
                label="Fichiers et documents"
            />
        </DocRoot>
    )
}
