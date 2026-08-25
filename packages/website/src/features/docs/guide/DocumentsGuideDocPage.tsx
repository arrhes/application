import { DocCode } from "../../../components/document/DocCode.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocImplementationTabs } from "../../../components/document/DocImplementationTabs.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTable } from "../../../components/document/DocTable.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function DocumentsGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Documents comptables"
                description="Produire les rapports de synthèse"
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Comptasse génère les principaux documents comptables nécessaires à la gestion et aux obligations
                    légales.
                </DocParagraph>
                <DocList
                    items={[
                        "Grand livre : détail de tous les mouvements par compte",
                        "Balance : situation de chaque compte avec débits, crédits et soldes",
                        "Journal : liste chronologique des écritures",
                        "Bilan et compte de résultat : documents de clôture",
                    ]}
                />
            </DocSection>

            <DocSection title="Implémentation">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocParagraph>
                                Ouvrez un exercice et cliquez sur l'onglet « Rapports ». Choisissez le type de document
                                à générer.
                            </DocParagraph>
                            <DocExample title="Générer une balance">
                                <DocList
                                    items={[
                                        "Ouvrez l'exercice comptable concerné",
                                        "Cliquez sur Rapports",
                                        "Sélectionnez Balance",
                                        "Choisissez la période (optionnel)",
                                        "Cliquez sur Générer",
                                    ]}
                                />
                            </DocExample>
                            <DocExample title="Extrait de balance">
                                <DocTable
                                    headers={[
                                        "Compte",
                                        "Libellé",
                                        "Total Débit",
                                        "Total Crédit",
                                        "Solde",
                                    ]}
                                    rows={[
                                        [
                                            "411",
                                            "Clients",
                                            "15 000,00",
                                            "12 000,00",
                                            "3 000,00 D",
                                        ],
                                        [
                                            "401",
                                            "Fournisseurs",
                                            "8 000,00",
                                            "10 000,00",
                                            "2 000,00 C",
                                        ],
                                        [
                                            "512",
                                            "Banque",
                                            "45 000,00",
                                            "38 000,00",
                                            "7 000,00 D",
                                        ],
                                    ]}
                                />
                            </DocExample>
                            <DocParagraph>
                                <strong>Vérification :</strong> le total des soldes débiteurs doit toujours être égal au
                                total des soldes créditeurs.
                            </DocParagraph>
                        </>
                    }
                    api={
                        <>
                            <DocParagraph>
                                Les documents de synthèse exploitent les écritures de l'exercice. Les exports XBRL et
                                FEC sont disponibles via l'API dédiée (voir{" "}
                                <DocLink to="/documentation/guide/exports">Exports</DocLink>). Les bilans et comptes de
                                résultat personnalisés sont décrits dans les pages{" "}
                                <DocLink to="/documentation/guide/bilans">Bilans</DocLink> et{" "}
                                <DocLink to="/documentation/guide/compte-de-résultat">Compte de résultat</DocLink>.
                            </DocParagraph>
                            <DocTip variant="info">
                                Le journal et le grand livre sont générés côté client à partir des endpoints d'écritures
                                et de comptes.
                            </DocTip>
                        </>
                    }
                    cli={
                        <>
                            <DocParagraph>
                                La CLI regroupe les commandes d'export sous <DocCode>comptasse exports</DocCode>. Pour
                                structurer le bilan et le compte de résultat, consultez les pages dédiées.
                            </DocParagraph>
                            <DocTable
                                headers={[
                                    "Commande",
                                    "Description",
                                ]}
                                rows={[
                                    [
                                        <DocCode key="0">{"comptasse exports fec --year <id>"}</DocCode>,
                                        "Génère un export FEC",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse exports xbrl-balance-sheet --year <id>"}</DocCode>,
                                        "Génère un export XBRL du bilan",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"comptasse exports xbrl-income-statement --year <id>"}
                                        </DocCode>,
                                        "Génère un export XBRL du compte de résultat",
                                    ],
                                ]}
                            />
                        </>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
