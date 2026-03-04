import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocNextPage } from "../../../components/document/docNextPage.tsx"
import { DocParagraph } from "../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocSection } from "../../../components/document/docSection.tsx"
import { DocTable } from "../../../components/document/docTable.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"

export function AccountingApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Comptabilité"
                description="Exercices, comptes, journaux, bilans, comptes de résultat, calculs, écritures et lignes d'écriture"
            />

            <DocTip variant="info">
                Toutes les routes de cette section nécessitent <code>idOrganization</code> et <code>idYear</code> dans
                le corps de la requête, sauf indication contraire.
            </DocTip>

            <DocSection title="Exercices">
                <DocParagraph>
                    Un exercice comptable correspond à une période (généralement une année civile) sur laquelle les
                    opérations sont enregistrées.
                </DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-all-years", "Lister les exercices"],
                        ["POST /auth/create-one-year", "Créer un exercice"],
                        ["POST /auth/read-one-year", "Lire un exercice"],
                    ]}
                />
            </DocSection>

            <DocSection title="POST /auth/create-one-year">
                <DocTable
                    headers={["Champ", "Type", "Requis"]}
                    rows={[
                        ["idOrganization", "string", "oui"],
                        ["idYearPrevious", "string", "non"],
                        ["label", "string", "non"],
                        ["startingAt", "string", "oui"],
                        ["endingAt", "string", "oui"],
                    ]}
                />
                <DocParagraph>Retourne l'objet exercice créé.</DocParagraph>
            </DocSection>

            <DocSection title="Paramètres d'exercice">
                <DocParagraph>
                    Routes de gestion et de clôture d'exercice. Toutes nécessitent <code>idYear</code> et{" "}
                    <code>idOrganization</code>.
                </DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/update-one-year", "Modifier un exercice"],
                        ["POST /auth/delete-one-year", "Supprimer un exercice"],
                        ["POST /auth/close-year", "Clôturer un exercice"],
                        ["POST /auth/open-year", "Ouvrir un exercice (report des soldes)"],
                        ["POST /auth/settle-balance-sheet", "Solder les comptes de bilan"],
                        ["POST /auth/settle-income-statement", "Solder les comptes de résultat"],
                    ]}
                />
                <DocTip variant="warning">
                    La clôture d'un exercice empêche toute modification ultérieure des écritures.
                </DocTip>
            </DocSection>

            <DocSection title="Comptes">
                <DocParagraph>
                    Le plan comptable de l'organisation. Les comptes sont organisés en arborescence avec des classes (1
                    à 7) à la racine.
                </DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-all-accounts", "Lister les comptes"],
                        ["POST /auth/read-one-account", "Lire un compte"],
                        ["POST /auth/create-one-account", "Créer un compte"],
                        ["POST /auth/update-one-account", "Modifier un compte"],
                        ["POST /auth/delete-one-account", "Supprimer un compte"],
                        ["POST /auth/generate-accounts", "Générer le PCG par défaut"],
                    ]}
                />
            </DocSection>

            <DocSection title="POST /auth/create-one-account">
                <DocTable
                    headers={["Champ", "Type", "Requis"]}
                    rows={[
                        ["idAccountParent", "string", "oui"],
                        ["number", "string", "oui"],
                        ["label", "string", "oui"],
                        ["type", "string", "oui"],
                        ["isClass", "boolean", "oui"],
                        ["isSelectable", "boolean", "oui"],
                        ["idBalanceSheetAsset", "string", "non"],
                        ["balanceSheetAssetColumn", "string", "non"],
                        ["balanceSheetAssetFlow", "string", "non"],
                        ["idBalanceSheetLiability", "string", "non"],
                        ["balanceSheetLiabilityColumn", "string", "non"],
                        ["balanceSheetLiabilityFlow", "string", "non"],
                        ["idIncomeStatement", "string", "non"],
                    ]}
                />
                <DocParagraph>Retourne l'objet compte créé.</DocParagraph>
            </DocSection>

            <DocSection title="Journaux">
                <DocParagraph>Les journaux comptables regroupent les écritures par type d'opération.</DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-all-journals", "Lister les journaux"],
                        ["POST /auth/read-one-journal", "Lire un journal"],
                        ["POST /auth/create-one-journal", "Créer un journal"],
                        ["POST /auth/update-one-journal", "Modifier un journal"],
                        ["POST /auth/delete-one-journal", "Supprimer un journal"],
                        ["POST /auth/generate-journals", "Générer les journaux par défaut"],
                    ]}
                />
            </DocSection>

            <DocSection title="Bilans">
                <DocParagraph>
                    Structure du bilan comptable (actif et passif). Les lignes de bilan sont liées aux comptes pour
                    calculer automatiquement les soldes.
                </DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-all-balance-sheets", "Lister les lignes de bilan"],
                        ["POST /auth/read-one-balance-sheet", "Lire une ligne de bilan"],
                        ["POST /auth/create-one-balance-sheet", "Créer une ligne de bilan"],
                        ["POST /auth/update-one-balance-sheet", "Modifier une ligne de bilan"],
                        ["POST /auth/delete-one-balance-sheet", "Supprimer une ligne de bilan"],
                        ["POST /auth/generate-balance-sheets", "Générer la structure de bilan par défaut"],
                        [
                            "POST /auth/connect-accounts-to-balance-sheets",
                            "Lier automatiquement les comptes aux lignes de bilan",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="Comptes de résultat">
                <DocParagraph>
                    Structure du compte de résultat. Fonctionne de manière similaire aux bilans.
                </DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-all-income-statements", "Lister les lignes"],
                        ["POST /auth/read-one-income-statement", "Lire une ligne"],
                        ["POST /auth/create-one-income-statement", "Créer une ligne"],
                        ["POST /auth/update-one-income-statement", "Modifier une ligne"],
                        ["POST /auth/delete-one-income-statement", "Supprimer une ligne"],
                        ["POST /auth/generate-income-statements", "Générer la structure par défaut"],
                        [
                            "POST /auth/connect-accounts-to-income-statements",
                            "Lier automatiquement les comptes aux lignes",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="Libellés d'écriture">
                <DocParagraph>
                    Les libellés permettent de catégoriser les écritures comptables avec des étiquettes réutilisables.
                </DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-all-record-labels", "Lister les libellés"],
                        ["POST /auth/read-one-record-label", "Lire un libellé"],
                        ["POST /auth/create-one-record-label", "Créer un libellé"],
                        ["POST /auth/update-one-record-label", "Modifier un libellé"],
                        ["POST /auth/delete-one-record-label", "Supprimer un libellé"],
                    ]}
                />
            </DocSection>

            <DocSection title="Calculs">
                <DocParagraph>
                    Les calculs sont des formules personnalisées qui combinent des lignes de compte de résultat pour
                    produire des valeurs dérivées (par exemple le résultat d'exploitation).
                </DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-all-computations", "Lister les calculs"],
                        ["POST /auth/read-one-computation", "Lire un calcul"],
                        ["POST /auth/create-one-computation", "Créer un calcul"],
                        ["POST /auth/update-one-computation", "Modifier un calcul"],
                        ["POST /auth/delete-one-computation", "Supprimer un calcul"],
                        ["POST /auth/generate-computations", "Générer les calculs par défaut"],
                    ]}
                />
            </DocSection>

            <DocSection title="Calculs - comptes de résultat">
                <DocParagraph>
                    Liens entre les calculs et les lignes de compte de résultat. Chaque lien définit si la ligne est
                    ajoutée ou soustraite.
                </DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-all-computation-income-statements", "Lister les liens"],
                        ["POST /auth/read-one-computation-income-statement", "Lire un lien"],
                        ["POST /auth/create-one-computation-income-statement", "Créer un lien"],
                        ["POST /auth/update-one-computation-income-statement", "Modifier un lien"],
                        ["POST /auth/delete-one-computation-income-statement", "Supprimer un lien"],
                    ]}
                />
            </DocSection>

            <DocSection title="Écritures">
                <DocParagraph>
                    Les écritures comptables sont les opérations enregistrées dans les journaux. Chaque écriture
                    contient une ou plusieurs lignes (débit/crédit).
                </DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-all-records", "Lister les écritures"],
                        ["POST /auth/read-one-record", "Lire une écriture"],
                        ["POST /auth/create-one-record", "Créer une écriture"],
                        ["POST /auth/create-one-record-from-template", "Créer une écriture avec lignes pré-remplies"],
                        ["POST /auth/update-one-record", "Modifier une écriture"],
                        ["POST /auth/delete-one-record", "Supprimer une écriture"],
                        ["POST /auth/duplicate-one-record", "Dupliquer une écriture"],
                        ["POST /auth/compute-one-record", "Recalculer les indicateurs d'une écriture"],
                    ]}
                />
            </DocSection>

            <DocSection title="POST /auth/create-one-record">
                <DocTable
                    headers={["Champ", "Type", "Requis"]}
                    rows={[
                        ["label", "string", "oui"],
                        ["date", "string", "oui"],
                        ["idJournal", "string", "non"],
                        ["idRecordLabel", "string", "non"],
                        ["idFile", "string", "non"],
                    ]}
                />
                <DocParagraph>Retourne l'objet écriture créé.</DocParagraph>
            </DocSection>

            <DocSection title="Lignes d'écriture">
                <DocParagraph>
                    Chaque ligne d'écriture représente un mouvement de débit ou de crédit sur un compte.
                </DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-all-record-rows", "Lister les lignes"],
                        ["POST /auth/read-one-record-row", "Lire une ligne"],
                        ["POST /auth/create-one-record-row", "Créer une ligne"],
                        ["POST /auth/update-one-record-row", "Modifier une ligne"],
                        ["POST /auth/update-many-record-rows", "Modifier toutes les lignes d'une écriture"],
                        ["POST /auth/delete-one-record-row", "Supprimer une ligne"],
                    ]}
                />
            </DocSection>

            <DocSection title="POST /auth/create-one-record-row">
                <DocTable
                    headers={["Champ", "Type", "Requis"]}
                    rows={[
                        ["idRecord", "string", "oui"],
                        ["idAccount", "string", "oui"],
                        ["isComputedForJournalReport", "boolean", "oui"],
                        ["isComputedForLedgerReport", "boolean", "oui"],
                        ["isComputedForBalanceReport", "boolean", "oui"],
                        ["isComputedForBalanceSheetReport", "boolean", "oui"],
                        ["isComputedForIncomeStatementReport", "boolean", "oui"],
                        ["label", "string", "non"],
                        ["debit", "string", "non"],
                        ["credit", "string", "non"],
                    ]}
                />
                <DocParagraph>Retourne l'objet ligne d'écriture créé.</DocParagraph>
            </DocSection>

            <DocNextPage to="/documentation/api/stockage" label="Fichiers et documents" />
        </DocRoot>
    )
}
