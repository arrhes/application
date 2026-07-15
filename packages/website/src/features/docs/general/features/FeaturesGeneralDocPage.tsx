import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocList } from "../../../../components/document/DocList.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocSection } from "../../../../components/document/DocSection.js"

export function FeaturesGeneralDocPage() {
    return (
        <>
            <DocHeader
                title="Fonctionnalités"
                description="Découvrez toutes les fonctionnalités d'Arrhes pour gérer votre comptabilité de manière simple et efficace."
            />

            <DocSection title="Saisie des écritures">
                <DocParagraph>Enregistrez vos écritures comptables avec une interface intuitive.</DocParagraph>
                <DocList
                    items={[
                        "Journal chronologique",
                        "Lettrage automatique",
                    ]}
                />
            </DocSection>

            <DocSection title="Espace de stockage">
                <DocParagraph>Organisez vos documents et accédez-y rapidement.</DocParagraph>
                <DocList
                    items={[
                        "Pièces justificatives (factures, relevés bancaires, etc.)",
                        "Visualisation des documents",
                        "Volume offert de 1 Go par organisation",
                    ]}
                />
            </DocSection>

            <DocSection title="Documents comptables">
                <DocParagraph>
                    Générez tous vos documents comptables de synthèse conformes aux normes françaises.
                </DocParagraph>
                <DocList
                    items={[
                        "Grand livre, Balance générale, Bilan comptable, Compte de résultat",
                        "Export du Fichier des Écritures Comptable (FEC)",
                        "Mise à jour automatique à chaque nouvelle écriture",
                        "Export PDF",
                    ]}
                />
            </DocSection>

            <DocSection title="Multiple organisations">
                <DocParagraph>Gérez plusieurs structures avec un seul compte et collaborez en équipe.</DocParagraph>
                <DocList
                    items={[
                        "Organisations illimitées",
                        "Gestion des membres",
                        "Exercices illimités",
                    ]}
                />
            </DocSection>

            <DocSection title="API REST">
                <DocParagraph>Intégrez Arrhes à vos outils grâce à notre API complète.</DocParagraph>
                <DocList
                    items={[
                        "Authentification par clé API",
                        "Accès complet aux écritures et documents",
                        "Documentation intégrée",
                    ]}
                />
            </DocSection>

            <DocSection title="Reconnaissance optique (OCR)">
                <DocParagraph>
                    Extrayez le texte de vos documents pour les analyser avec votre propre agent ou directement dans
                    Arrhes.
                </DocParagraph>
                <DocList
                    items={[
                        "100 pages incluses",
                        "Formats PDF, JPEG, PNG",
                        "Configuration BYOK (bring your own key)",
                    ]}
                />
            </DocSection>

            <DocSection title="Sécurité">
                <DocParagraph>Vos données sont protégées avec les meilleures pratiques de sécurité.</DocParagraph>
                <DocList
                    items={[
                        "Chiffrement bout-en-bout",
                        "Sauvegardes automatiques",
                        "Hébergement en France",
                    ]}
                />
            </DocSection>
        </>
    )
}
