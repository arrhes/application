import {
    createOneJournalRouteDefinition,
    deleteOneJournalRouteDefinition,
    readAllJournalsRouteDefinition,
    readOneJournalRouteDefinition,
    updateOneJournalRouteDefinition,
} from "@arrhes/application-metadata/routes"
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
import { DocTip } from "../../../components/document/DocTip.js"

export function JournauxGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Journaux"
                description="Journaux comptables de l'exercice"
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Les journaux comptables regroupent les écritures par type d'opération. Des journaux par défaut sont
                    créés automatiquement (Achats, Ventes, Banque, Caisse, Opérations diverses).
                </DocParagraph>
                <DocList
                    items={[
                        "Chaque écriture est associée à un journal.",
                        "Les journaux permettent de classer et filtrer les opérations.",
                        "Vous pouvez créer des journaux supplémentaires si nécessaire.",
                    ]}
                />
            </DocSection>

            <DocSection title="Implémentation">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocParagraph>
                                Les journaux se configurent dans les paramètres de l'exercice. Vous pouvez créer un
                                journal par compte bancaire si vous en avez plusieurs.
                            </DocParagraph>
                            <DocList
                                items={[
                                    "Ouvrez l'exercice concerné",
                                    "Allez dans Paramètres → Journaux",
                                    "Cliquez sur « Ajouter un journal »",
                                    "Renseignez le code et le libellé",
                                    "Enregistrez",
                                ]}
                            />
                        </>
                    }
                    api={
                        <>
                            <DocParagraph>
                                Les journaux comptables regroupent les écritures par type d'opération (achats, ventes,
                                trésorerie, OD, etc.).
                            </DocParagraph>
                            <DocRouteRequest routeDefinition={createOneJournalRouteDefinition} />
                            <DocRouteRequest routeDefinition={readAllJournalsRouteDefinition} />
                            <DocRouteRequest routeDefinition={readOneJournalRouteDefinition} />
                            <DocRouteRequest routeDefinition={updateOneJournalRouteDefinition} />
                            <DocRouteRequest routeDefinition={deleteOneJournalRouteDefinition} />
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
                                        <DocCode key="0">{"arrhes journals list --year <id>"}</DocCode>,
                                        "Liste les journaux",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes journals get <id> --year <id>"}</DocCode>,
                                        "Détails d'un journal",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"arrhes journals create --year <id> --code <code> --label <libellé>"}
                                        </DocCode>,
                                        "Crée un journal",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes journals update <id> --year <id>"}</DocCode>,
                                        "Modifie un journal",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes journals delete <id> --year <id>"}</DocCode>,
                                        "Supprime un journal",
                                    ],
                                ]}
                            />
                            <DocExample title="Créer un journal d'achats">
                                <DocCodeBlock>
                                    arrhes journals create --year year_xyz --code ACH --label "Achats"
                                </DocCodeBlock>
                            </DocExample>
                            <DocTip variant="warning">
                                La suppression d'un journal échoue si des écritures y sont encore rattachées.
                            </DocTip>
                        </>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
