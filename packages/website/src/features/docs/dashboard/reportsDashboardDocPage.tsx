import { DocExample } from "../../../components/document/docExample.js"
import { DocHeader } from "../../../components/document/docHeader.js"
import { DocLink } from "../../../components/document/docLink.js"
import { DocList } from "../../../components/document/docList.js"
import { DocParagraph } from "../../../components/document/docParagraph.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocSection } from "../../../components/document/docSection.js"
import { DocTable } from "../../../components/document/docTable.js"

export function ReportsDashboardDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Visualiser et générer les documents de synthèse"
                description="Produire vos documents comptables et analyser vos données"
            />

            <DocSection title="Les rapports disponibles">
                <DocParagraph>
                    Arrhes vous permet de générer les principaux{" "}
                    <DocLink to="/documentation/comptabilité/documents">documents comptables</DocLink> nécessaires à la
                    gestion de votre entreprise et à vos obligations légales.
                </DocParagraph>
                <DocList
                    items={[
                        "Grand livre : détail de tous les mouvements par compte",
                        "Balance : situation de chaque compte (soldes débiteurs et créditeurs)",
                        "Journal : liste chronologique de toutes les écritures",
                        "Bilan : situation patrimoniale de l'entreprise (actif/passif)",
                        "Compte de résultat : synthèse des produits et charges de l'exercice",
                    ]}
                />
            </DocSection>

            <DocSection title="Accéder aux rapports">
                <DocParagraph>
                    Pour générer un rapport, accédez à votre exercice comptable puis cliquez sur l'onglet Rapports.
                    Sélectionnez ensuite le type de document souhaité.
                </DocParagraph>
                <DocExample title="Générer une balance">
                    <DocList
                        items={[
                            "Ouvrez l'exercice comptable concerné",
                            "Cliquez sur Rapports dans le menu",
                            "Sélectionnez Balance",
                            "Choisissez la période (optionnel)",
                            "Cliquez sur Générer",
                        ]}
                    />
                </DocExample>
            </DocSection>

            <DocSection title="Le Grand livre">
                <DocParagraph>
                    Le grand livre présente le détail de tous les mouvements pour chaque compte. C'est le document de
                    référence pour vérifier l'historique d'un compte.
                </DocParagraph>
                <DocList
                    items={[
                        "Affiche chaque écriture avec sa date, son libellé et son montant",
                        "Calcule le solde progressif après chaque mouvement",
                        "Peut être filtré par compte ou par période",
                        "Utile pour pointer les écarts et comprendre l'évolution d'un compte",
                    ]}
                />
            </DocSection>

            <DocSection title="La Balance">
                <DocParagraph>
                    La balance présente la situation de chaque compte avec le total des débits, le total des crédits et
                    le solde. Elle permet de vérifier l'équilibre comptable.
                </DocParagraph>
                <DocExample title="Extrait de balance">
                    <DocTable
                        headers={["Compte", "Libellé", "Total Débit", "Total Crédit", "Solde"]}
                        rows={[
                            ["411000", "Clients", "15 000,00", "12 000,00", "3 000,00 D"],
                            ["401000", "Fournisseurs", "8 000,00", "10 000,00", "2 000,00 C"],
                            ["512000", "Banque", "45 000,00", "38 000,00", "7 000,00 D"],
                        ]}
                    />
                </DocExample>
                <DocParagraph>
                    <strong>Vérification :</strong> le total des soldes débiteurs doit toujours être égal au total des
                    soldes créditeurs.
                </DocParagraph>
            </DocSection>

            <DocSection title="Le Bilan">
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
                <DocParagraph>
                    Le bilan est généralement produit à la clôture de l'exercice pour les comptes annuels, mais peut
                    aussi être généré à tout moment pour un suivi intermédiaire.
                </DocParagraph>
            </DocSection>

            <DocSection title="Le Compte de résultat">
                <DocParagraph>
                    Le compte de résultat présente les produits et les charges de l'exercice, et calcule le résultat
                    (bénéfice ou perte).
                </DocParagraph>
                <DocExample title="Structure simplifiée">
                    <DocTable
                        headers={["Élément", "Montant"]}
                        rows={[
                            ["Chiffre d'affaires", "100 000,00"],
                            ["Achats et charges externes", "- 60 000,00"],
                            ["Charges de personnel", "- 25 000,00"],
                            ["Autres charges", "- 5 000,00"],
                            ["Résultat", "10 000,00"],
                        ]}
                    />
                </DocExample>
            </DocSection>

            <DocSection title="Exporter les rapports">
                <DocParagraph>
                    Tous les rapports peuvent être exportés dans plusieurs formats pour être archivés ou transmis à
                    votre expert-comptable.
                </DocParagraph>
                <DocList
                    items={[
                        "PDF : format idéal pour l'archivage et l'impression",
                        "Excel (XLSX) : pour retravailler les données dans un tableur",
                        "CSV : format universel compatible avec tous les logiciels",
                    ]}
                />
                <DocExample title="Exporter un rapport">
                    <DocList
                        items={[
                            "Générez le rapport souhaité",
                            "Cliquez sur le bouton Exporter",
                            "Sélectionnez le format (PDF, Excel, CSV)",
                            "Le fichier est téléchargé sur votre ordinateur",
                        ]}
                    />
                </DocExample>
            </DocSection>

            <DocSection title="Filtrer par période">
                <DocParagraph>
                    La plupart des rapports peuvent être filtrés par période pour analyser une portion spécifique de
                    l'exercice (mois, trimestre...).
                </DocParagraph>
                <DocList
                    items={[
                        "Sélectionnez une date de début et une date de fin",
                        "Les rapports n'incluront que les écritures de cette période",
                        "Utile pour les déclarations périodiques (TVA mensuelle, trimestrielle...)",
                    ]}
                />
            </DocSection>

            <DocSection title="Conseils pratiques">
                <DocList
                    items={[
                        "Générez une balance chaque mois pour vérifier la cohérence de vos saisies",
                        "Comparez vos soldes bancaires avec vos relevés pour détecter les écarts",
                        "Archivez vos rapports PDF pour conserver une trace datée",
                        "Transmettez les exports à votre expert-comptable pour la révision annuelle",
                    ]}
                />
            </DocSection>
        </DocRoot>
    )
}
