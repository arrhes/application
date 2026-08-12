import {
    createOneComputationIncomeStatementRouteDefinition,
    createOneComputationRouteDefinition,
    createOneIncomeStatementRouteDefinition,
    deleteOneComputationIncomeStatementRouteDefinition,
    deleteOneComputationRouteDefinition,
    deleteOneIncomeStatementRouteDefinition,
    readAllComputationIncomeStatementsRouteDefinition,
    readAllComputationsRouteDefinition,
    readAllIncomeStatementsRouteDefinition,
    readOneComputationIncomeStatementRouteDefinition,
    readOneComputationRouteDefinition,
    readOneIncomeStatementRouteDefinition,
    updateOneComputationIncomeStatementRouteDefinition,
    updateOneComputationRouteDefinition,
    updateOneIncomeStatementRouteDefinition,
} from "@comptasse/application-metadata/routes"
import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocImplementationTabs } from "../../../components/document/DocImplementationTabs.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTable } from "../../../components/document/DocTable.js"

export function CompteDeResultatGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Compte de résultat"
                description="Structurer le compte de résultat et ses calculs"
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Le compte de résultat présente les produits et les charges de l'exercice et calcule le résultat
                    (bénéfice ou perte).
                </DocParagraph>
            </DocSection>

            <DocSection title="Implémentation">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocParagraph>
                                Dans la vue d'un exercice, ouvrez « Compte de résultat ». Créez une arborescence de
                                nœuds produits/charges et ajoutez des calculs personnalisés si nécessaire.
                            </DocParagraph>
                            <DocExample title="Structure simplifiée">
                                <DocTable
                                    headers={[
                                        "Élément",
                                        "Montant",
                                    ]}
                                    rows={[
                                        [
                                            "Chiffre d'affaires",
                                            "100 000,00",
                                        ],
                                        [
                                            "Achats et charges externes",
                                            "- 60 000,00",
                                        ],
                                        [
                                            "Charges de personnel",
                                            "- 25 000,00",
                                        ],
                                        [
                                            "Autres charges",
                                            "- 5 000,00",
                                        ],
                                        [
                                            "Résultat",
                                            "10 000,00",
                                        ],
                                    ]}
                                />
                            </DocExample>
                        </>
                    }
                    api={
                        <>
                            <DocSection
                                title="Compte de résultat"
                                depth={1}
                            >
                                <DocParagraph>
                                    La structure fonctionne comme celle des bilans : les nœuds sont liés aux comptes
                                    pour le calcul automatique des soldes.
                                </DocParagraph>
                                <DocRouteRequest routeDefinition={createOneIncomeStatementRouteDefinition} />
                                <DocRouteRequest routeDefinition={readAllIncomeStatementsRouteDefinition} />
                                <DocRouteRequest routeDefinition={readOneIncomeStatementRouteDefinition} />
                                <DocRouteRequest routeDefinition={updateOneIncomeStatementRouteDefinition} />
                                <DocRouteRequest routeDefinition={deleteOneIncomeStatementRouteDefinition} />
                            </DocSection>
                            <DocSection
                                title="Calculs"
                                depth={1}
                            >
                                <DocParagraph>
                                    Les calculs combinent des lignes de compte de résultat pour produire des valeurs
                                    dérivées (résultat d'exploitation, EBE, etc.).
                                </DocParagraph>
                                <DocRouteRequest routeDefinition={createOneComputationRouteDefinition} />
                                <DocRouteRequest routeDefinition={readAllComputationsRouteDefinition} />
                                <DocRouteRequest routeDefinition={readOneComputationRouteDefinition} />
                                <DocRouteRequest routeDefinition={updateOneComputationRouteDefinition} />
                                <DocRouteRequest routeDefinition={deleteOneComputationRouteDefinition} />
                            </DocSection>
                            <DocSection
                                title="Lignes de calcul"
                                depth={1}
                            >
                                <DocParagraph>
                                    Chaque lien définit si une ligne de compte de résultat est ajoutée ou soustraite
                                    dans un calcul.
                                </DocParagraph>
                                <DocRouteRequest routeDefinition={createOneComputationIncomeStatementRouteDefinition} />
                                <DocRouteRequest routeDefinition={readAllComputationIncomeStatementsRouteDefinition} />
                                <DocRouteRequest routeDefinition={readOneComputationIncomeStatementRouteDefinition} />
                                <DocRouteRequest routeDefinition={updateOneComputationIncomeStatementRouteDefinition} />
                                <DocRouteRequest routeDefinition={deleteOneComputationIncomeStatementRouteDefinition} />
                            </DocSection>
                        </>
                    }
                    cli={
                        <>
                            <DocTable
                                headers={[
                                    "Commande",
                                    "Description",
                                ]}
                                rows={[
                                    [
                                        <DocCode key="0">{"comptasse income-statements list <idYear>"}</DocCode>,
                                        "Liste les nœuds",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse income-statements get <idYear> <id>"}</DocCode>,
                                        "Détails d'un nœud",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse income-statements create <idYear>"}</DocCode>,
                                        "Crée un nœud",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse income-statements update <idYear> <id>"}</DocCode>,
                                        "Modifie un nœud",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse income-statements delete <idYear> <id>"}</DocCode>,
                                        "Supprime un nœud",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"comptasse income-statements computations list <idYear>"}
                                        </DocCode>,
                                        "Liste les calculs",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"comptasse income-statements computations create <idYear>"}
                                        </DocCode>,
                                        "Crée un calcul",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"comptasse income-statements computations delete <idYear> <id>"}
                                        </DocCode>,
                                        "Supprime un calcul",
                                    ],
                                ]}
                            />
                            <DocExample title="Créer un nœud">
                                <DocCodeBlock>
                                    comptasse income-statements create year_xyz --label "Produits d'exploitation"
                                </DocCodeBlock>
                            </DocExample>
                            <DocExample title="Créer un calcul">
                                <DocCodeBlock>
                                    comptasse income-statements computations create year_xyz --label "Résultat
                                    d'exploitation"
                                </DocCodeBlock>
                            </DocExample>
                        </>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
