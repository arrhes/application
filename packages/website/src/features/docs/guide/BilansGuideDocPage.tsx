import {
    createOneBalanceSheetRouteDefinition,
    deleteOneBalanceSheetRouteDefinition,
    readAllBalanceSheetsRouteDefinition,
    readOneBalanceSheetRouteDefinition,
    updateOneBalanceSheetRouteDefinition,
} from "@comptasse/application-metadata/routes"
import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocImplementationTabs } from "../../../components/document/DocImplementationTabs.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTable } from "../../../components/document/DocTable.js"

export function BilansGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Bilans"
                description="Structurer le bilan comptable de l'exercice"
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Le bilan présente la situation patrimoniale de l'entreprise à une date donnée. Il est structuré en
                    deux parties équilibrées :
                </DocParagraph>
                <DocList
                    items={[
                        "L'actif : ce que l'entreprise possède (immobilisations, stocks, créances, trésorerie)",
                        "Le passif : les ressources de l'entreprise (capitaux propres, emprunts, dettes)",
                    ]}
                />
            </DocSection>

            <DocSection title="Implémentation">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocParagraph>
                                Dans la vue d'un exercice, ouvrez « Bilan ». Créez une arborescence de nœuds et associez
                                chaque feuille à un compte ou un groupe de comptes.
                            </DocParagraph>
                            <DocList
                                items={[
                                    "Créez un nœud racine Actif ou Passif",
                                    "Ajoutez des sous-nœuds (Immobilisations, Créances, Capitaux propres…)",
                                    "Liez les feuilles aux comptes correspondants",
                                    "Générez le bilan pour obtenir les soldes automatiques",
                                ]}
                            />
                        </>
                    }
                    api={
                        <>
                            <DocParagraph>
                                La structure du bilan est organisée sous forme de nœuds hiérarchiques. Chaque feuille
                                peut être liée à un compte pour le calcul automatique des soldes.
                            </DocParagraph>
                            <DocRouteRequest routeDefinition={createOneBalanceSheetRouteDefinition} />
                            <DocRouteRequest routeDefinition={readAllBalanceSheetsRouteDefinition} />
                            <DocRouteRequest routeDefinition={readOneBalanceSheetRouteDefinition} />
                            <DocRouteRequest routeDefinition={updateOneBalanceSheetRouteDefinition} />
                            <DocRouteRequest routeDefinition={deleteOneBalanceSheetRouteDefinition} />
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
                                        <DocCode key="0">{"comptasse balance-sheets list <idYear>"}</DocCode>,
                                        "Liste les nœuds",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse balance-sheets get <idYear> <id>"}</DocCode>,
                                        "Détails d'un nœud",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse balance-sheets create <idYear>"}</DocCode>,
                                        "Crée un nœud",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse balance-sheets update <idYear> <id>"}</DocCode>,
                                        "Modifie un nœud",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse balance-sheets delete <idYear> <id>"}</DocCode>,
                                        "Supprime un nœud",
                                    ],
                                ]}
                            />
                            <DocExample title="Créer un nœud racine">
                                <DocCodeBlock>
                                    comptasse balance-sheets create year_xyz --label "Actif immobilisé"
                                </DocCodeBlock>
                            </DocExample>
                            <DocExample title="Créer un sous-nœud">
                                <DocCodeBlock>
                                    comptasse balance-sheets create year_xyz --parent bs_root --label "Immobilisations
                                    corporelles"
                                </DocCodeBlock>
                            </DocExample>
                        </>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
