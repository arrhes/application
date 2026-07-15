import {
    generateBalanceSheetXmlRouteDefinition,
    generateFecRouteDefinition,
    generateIncomeStatementXmlRouteDefinition,
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

export function ExportsGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Exports"
                description="Exporter les données comptables au format réglementaire"
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Les exports permettent de transmettre les données comptables à l'administration ou à votre
                    expert-comptable.
                </DocParagraph>
                <DocList
                    items={[
                        "FEC : Fichier des Écritures Comptables requis par l'administration fiscale française",
                        "XBRL : rapports comptables normalisés selon la taxonomie ANC française",
                        "PDF / Excel / CSV : formats disponibles depuis le tableau de bord",
                    ]}
                />
            </DocSection>

            <DocSection title="Implémentation">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocParagraph>
                                Générez un rapport puis cliquez sur « Exporter ». Choisissez le format adapté :
                            </DocParagraph>
                            <DocList
                                items={[
                                    "PDF : pour l'archivage et l'impression",
                                    "Excel (XLSX) : pour retravailler les données",
                                    "CSV : format universel compatible avec tous les logiciels",
                                ]}
                            />
                            <DocExample title="Exporter une balance">
                                <DocList
                                    items={[
                                        "Générez le rapport souhaité",
                                        "Cliquez sur Exporter",
                                        "Sélectionnez le format",
                                        "Le fichier est téléchargé sur votre ordinateur",
                                    ]}
                                />
                            </DocExample>
                        </>
                    }
                    api={
                        <>
                            <DocSection title="Export FEC">
                                <DocParagraph>
                                    Le FEC est généré côté serveur. L'API retourne une URL signée pour télécharger le
                                    fichier.
                                </DocParagraph>
                                <DocRouteRequest
                                    routeDefinition={generateFecRouteDefinition}
                                    description="Générer le FEC de l'exercice et retourner une URL signée."
                                />
                            </DocSection>
                            <DocSection title="Exports XBRL">
                                <DocParagraph>
                                    Les rapports XBRL sont générés côté serveur et retournent une URL signée.
                                </DocParagraph>
                                <DocRouteRequest
                                    routeDefinition={generateBalanceSheetXmlRouteDefinition}
                                    description="Générer le bilan en XBRL."
                                />
                                <DocRouteRequest
                                    routeDefinition={generateIncomeStatementXmlRouteDefinition}
                                    description="Générer le compte de résultat en XBRL."
                                />
                                <DocTip variant="info">
                                    Les URLs signées ont une durée de validité limitée. Téléchargez le fichier
                                    immédiatement après génération.
                                </DocTip>
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
                                        <DocCode key="0">{"arrhes exports fec --year <id>"}</DocCode>,
                                        "Génère un export FEC",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes exports xbrl-balance-sheet --year <id>"}</DocCode>,
                                        "Génère un export XBRL du bilan",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes exports xbrl-income-statement --year <id>"}</DocCode>,
                                        "Génère un export XBRL du compte de résultat",
                                    ],
                                ]}
                            />
                            <DocExample title="Télécharger le FEC">
                                <DocCodeBlock>
                                    {'URL=$(arrhes exports fec --year year_xyz)\ncurl -o fec.txt "$URL"'}
                                </DocCodeBlock>
                            </DocExample>
                            <DocExample title="Télécharger le bilan XBRL">
                                <DocCodeBlock>
                                    {
                                        'URL=$(arrhes exports xbrl-balance-sheet --year year_xyz)\ncurl -o bilan.xml "$URL"'
                                    }
                                </DocCodeBlock>
                            </DocExample>
                            <DocTip variant="info">
                                Utilisez <DocCode>arrhes years close</DocCode> avant de générer le FEC final.
                            </DocTip>
                        </>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
