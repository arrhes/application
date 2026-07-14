import {
    closeYearRouteDefinition,
    createOneYearRouteDefinition,
    deleteOneYearRouteDefinition,
    openYearRouteDefinition,
    readAllYearsRouteDefinition,
    readOneYearRouteDefinition,
    settleBalanceSheetRouteDefinition,
    settleIncomeStatementRouteDefinition,
    updateOneYearRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocImplementationTabs } from "../../../components/document/DocImplementationTabs.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTable } from "../../../components/document/DocTable.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function ExerciceGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Exercices"
                description="Créer et gérer le cycle de vie de vos exercices comptables"
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Chaque organisation contient un ou plusieurs exercices comptables. Un exercice représente une
                    période (généralement 12 mois) pendant laquelle vous enregistrez vos opérations.
                </DocParagraph>
                <DocList
                    items={[
                        "Vous ne pouvez avoir qu'un seul exercice en cours à la fois.",
                        "Les exercices clôturés ne peuvent plus être modifiés.",
                        "À la clôture, le résultat est reporté dans l'exercice suivant.",
                        "Le plan comptable, les journaux et les libellés sont associés à un exercice.",
                    ]}
                />
                <DocTip variant="info">
                    Pour comprendre ce qu'est un exercice comptable, consultez la page sur les{" "}
                    <DocLink to="/documentation/comptabilité">principes fondamentaux</DocLink>.
                </DocTip>
            </DocSection>

            <DocSection title="Implémentation">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocParagraph>
                                Le dashboard permet de créer des exercices, de consulter leur état et de les clôturer.
                            </DocParagraph>
                            <DocExample title="Créer un exercice">
                                <DocList
                                    items={[
                                        "Accédez à votre organisation",
                                        "Cliquez sur « Ajouter un exercice »",
                                        "Donnez un nom à l'exercice (ex : Exercice 2024)",
                                        "Définissez les dates de début et de fin",
                                        "Validez",
                                    ]}
                                />
                            </DocExample>
                            <DocParagraph>
                                Le logiciel créera automatiquement un plan comptable adapté à votre type d'organisation.
                                Vous pourrez le personnaliser dans les paramètres de l'exercice si nécessaire.
                            </DocParagraph>
                        </>
                    }
                    api={
                        <>
                            <DocParagraph>
                                L'API expose les routes de création, lecture, modification et suppression des exercices,
                                ainsi que les opérations de clôture, réouverture et solde.
                            </DocParagraph>
                            <DocSection title="Exercices">
                                <DocRouteRequest routeDefinition={createOneYearRouteDefinition} />
                                <DocRouteRequest routeDefinition={readAllYearsRouteDefinition} />
                                <DocRouteRequest routeDefinition={readOneYearRouteDefinition} />
                            </DocSection>
                            <DocSection title="Cycle de vie">
                                <DocRouteRequest routeDefinition={updateOneYearRouteDefinition} />
                                <DocRouteRequest routeDefinition={deleteOneYearRouteDefinition} />
                                <DocRouteRequest routeDefinition={openYearRouteDefinition} />
                                <DocRouteRequest routeDefinition={closeYearRouteDefinition} />
                                <DocRouteRequest routeDefinition={settleBalanceSheetRouteDefinition} />
                                <DocRouteRequest routeDefinition={settleIncomeStatementRouteDefinition} />
                                <DocTip variant="warning">
                                    La clôture d'un exercice empêche toute modification ultérieure des écritures.
                                </DocTip>
                            </DocSection>
                        </>
                    }
                    cli={
                        <>
                            <DocParagraph>
                                La commande <DocCode>arrhes years</DocCode> permet de lister, consulter, créer,
                                modifier, supprimer, clôturer et réouvrir des exercices.
                            </DocParagraph>
                            <DocTable
                                headers={[
                                    "Commande",
                                    "Description",
                                ]}
                                rows={[
                                    [
                                        <DocCode key="0">arrhes years list</DocCode>,
                                        "Liste les exercices de l'organisation",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes years get <idYear>"}</DocCode>,
                                        "Détails d'un exercice",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes years create --start <date> --end <date>"}</DocCode>,
                                        "Crée un exercice",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes years update <idYear>"}</DocCode>,
                                        "Modifie un exercice",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes years delete <idYear>"}</DocCode>,
                                        "Supprime un exercice",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes years close <idYear>"}</DocCode>,
                                        "Clôture un exercice",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"arrhes years open <idYear> --journal-opening <id>"}
                                        </DocCode>,
                                        "Réouvre un exercice",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"arrhes years settle-balance-sheet <idYear> --journal-closing <id>"}
                                        </DocCode>,
                                        "Solde le bilan",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"arrhes years settle-income-statement <idYear> --journal-closing <id>"}
                                        </DocCode>,
                                        "Solde le compte de résultat",
                                    ],
                                ]}
                            />
                            <DocExample title="Créer un exercice">
                                <DocCodeBlock>
                                    arrhes years create --start 2025-01-01 --end 2025-12-31 --label "Exercice 2025"
                                </DocCodeBlock>
                            </DocExample>
                            <DocExample title="Lister les exercices">
                                <DocCodeBlock>arrhes years list</DocCodeBlock>
                                <DocCodeBlock>{"arrhes years list | jq '.[].id'"}</DocCodeBlock>
                            </DocExample>
                            <DocTip variant="info">
                                Toutes les réponses du CLI sont en JSON. Combinez-les avec <DocCode>jq</DocCode> pour
                                filtrer ou formater les résultats.
                            </DocTip>
                        </>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
