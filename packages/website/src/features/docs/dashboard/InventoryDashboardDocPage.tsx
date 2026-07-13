import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function InventoryDashboardDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Inventaire"
                description="Suivez votre stock et vos mouvements de marchandises"
            />

            <DocSection title="Pourquoi gérer l'inventaire dans Arrhes ?">
                <DocParagraph>
                    La gestion des stocks vous permet de suivre la disponibilité de vos marchandises, matières premières
                    ou produits finis, directement depuis votre espace de travail. Chaque article est rattaché à un
                    exercice et à une organisation pour garder une séparation claire entre vos différentes activités.
                </DocParagraph>
                <DocParagraph>
                    En centralisant inventaire et comptabilité, vous pouvez croiser vos données de stock avec vos
                    <DocLink to="/documentation/dashboard/écritures">écritures comptables</DocLink> et vos rapports de
                    synthèse.
                </DocParagraph>
            </DocSection>

            <DocSection title="Créer un article">
                <DocParagraph>
                    Un article d'inventaire est identifié par un SKU unique au sein d'un exercice. Vous pouvez y
                    renseigner :
                </DocParagraph>
                <DocList
                    items={[
                        "Un nom et une description",
                        "Une catégorie (matière première, produit fini, fourniture...)",
                        "Une unité de mesure (unité, kg, litre, mètre...)",
                        "Un prix unitaire",
                        "Un seuil minimal pour alerter en cas de stock faible",
                        "Un emplacement de stockage",
                    ]}
                />
                <DocExample title="Étapes pour ajouter un article">
                    <DocList
                        items={[
                            "Rendez-vous dans les paramètres de l'exercice",
                            "Ouvrez l'onglet Inventaire",
                            "Cliquez sur Ajouter un article",
                            "Renseignez les informations et validez",
                        ]}
                    />
                </DocExample>
            </DocSection>

            <DocSection title="Enregistrer des mouvements">
                <DocParagraph>
                    La quantité en stock évolue au fil des mouvements. Chaque mouvement indique une date, un type
                    (entrée ou sortie) et une quantité. La quantité actuelle de l'article est automatiquement recalculée
                    après chaque mouvement.
                </DocParagraph>
                <DocList
                    items={[
                        "Entrée de stock : réception de marchandises, production",
                        "Sortie de stock : vente, consommation interne, perte",
                        "Chaque mouvement peut inclure un motif pour tracer l'origine du changement",
                    ]}
                />
                <DocTip>
                    La suppression ou la modification d'un mouvement met à jour la quantité actuelle de l'article
                    concerné.
                </DocTip>
            </DocSection>

            <DocSection title="Alertes et bonnes pratiques">
                <DocList
                    items={[
                        "Définissez un seuil minimal pour être averti avant la rupture de stock",
                        "Enregistrez les mouvements régulièrement pour conserver un stock fiable",
                        "Utilisez le SKU comme référence stable, indépendamment du nom de l'article",
                        "Indiquez l'emplacement de stockage pour faciliter les inventaires physiques",
                    ]}
                />
            </DocSection>
        </DocRoot>
    )
}
