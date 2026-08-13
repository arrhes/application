import { Fragment } from "react"
import { DocCode } from "../../../components/document/DocCode.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function FeaturesGeneralDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Fonctionnalités"
                description="Découvrez l'ensemble des fonctionnalités de Comptasse pour gérer votre comptabilité au quotidien, seul ou en équipe."
            />

            <DocSection title="Saisie des écritures comptables">
                <DocParagraph>
                    Saisissez vos écritures comptables dans une interface pensée pour la rapidité et la fiabilité.
                    Chaque écriture est structurée en lignes de débit et de crédit, conformément aux règles de la partie
                    double.
                </DocParagraph>
                <DocList
                    items={[
                        "Journal chronologique avec recherche et filtrage",
                        "Lettrage automatique et rapprochement bancaire",
                        "Modèles d'écritures pour les opérations récurrentes",
                        "Gestion des pièces justificatives attachées à chaque écriture",
                        "Contrôles de cohérence et messages d'erreur explicites",
                    ]}
                />
            </DocSection>

            <DocSection title="Plan comptable et journaux">
                <DocParagraph>
                    Comptasse s'appuie sur le Plan Comptable Général (PCG) français. Vous pouvez consulter l'intégralité
                    des comptes, naviguer dans la hiérarchie des classes et créer autant de journaux que nécessaire pour
                    structurer votre activité.
                </DocParagraph>
                <DocList
                    items={[
                        "Plan comptable général complet et consultable",
                        "Navigation par classes, comptes et sous-comptes",
                        "Personnalisation de votre plan comptable",
                        "Création de journaux personnalisés",
                        "Gestion des libellés et tags pour classer vos écritures",
                    ]}
                />
            </DocSection>

            <DocSection title="Documents comptables de synthèse">
                <DocParagraph>
                    Générez automatiquement l'ensemble des documents comptables requis par la réglementation française.
                    Les documents sont mis à jour en temps réel à chaque nouvelle écriture.
                </DocParagraph>
                <DocList
                    items={[
                        "Grand livre, balance générale, bilan et compte de résultat",
                        "Export du Fichier des Écritures Comptables (FEC) au format réglementaire",
                        "Export des documents en format XML ou PDF",
                        "Mise à jour automatique après chaque écriture",
                    ]}
                />
            </DocSection>

            <DocSection title="Gestion des exercices et clôture">
                <DocParagraph>
                    Créez autant d'exercices comptables que nécessaire pour chaque organisation. Ouvrez, gérez et
                    clôturez vos exercices en quelques clics, tout en conservant l'historique complet.
                </DocParagraph>
                <DocList
                    items={[
                        "Création illimitée d'exercices par organisation",
                        "Suivi de l'état d'ouverture et de clôture",
                        "Arrêté des documents comptables avant clôture",
                        "Consultation des exercices passés",
                    ]}
                />
            </DocSection>

            <DocSection title="Espace de stockage sécurisé">
                <DocParagraph>
                    Rassemblez l'ensemble de vos pièces justificatives et documents comptables dans un espace de
                    stockage dédié. Chaque fichier peut être rattaché à une écriture, un exercice ou une organisation.
                </DocParagraph>
                <DocList
                    items={[
                        "Stockage des factures, relevés bancaires et autres justificatifs",
                        "Visualisation et organisation par dossiers",
                        "Stockage compatible avec le protocole S3 (vous pouvez apporter vous-même votre espace de stockage)",
                    ]}
                />
            </DocSection>

            <DocSection title="Reconnaissance optique de caractères (OCR)">
                <DocParagraph>
                    Extrayez automatiquement le texte de vos documents pour les analyser dans Comptasse ou avec votre
                    propre agent. L'OCR prend en charge les formats les plus courants et s'intègre à votre propre clé
                    d'API pour plus de flexibilité.
                </DocParagraph>
                <DocList
                    items={[
                        "Formats PDF, JPEG et PNG",
                        <Fragment key="byok">
                            Configuration <DocCode>BYOK</DocCode> (bring your own key)
                        </Fragment>,
                    ]}
                />
                <DocTip>
                    Avec la configuration BYOK (bring your own key), vous gardez le contrôle de vos clés API et de la
                    facturation liée au traitement OCR.
                </DocTip>
            </DocSection>

            <DocSection title="Multi-organisations et collaboration">
                <DocParagraph>
                    Gérez plusieurs structures comptables avec un seul compte et invitez les membres de votre équipe à
                    collaborer. Chaque organisation dispose de ses propres exercices, membres et données.
                </DocParagraph>
                <DocList
                    items={[
                        "Organisations illimitées par compte utilisateur",
                        "Gestion des membres et des rôles",
                        "Exercices comptables indépendants par organisation",
                        "Traçabilité des actions sur les données",
                    ]}
                />
            </DocSection>

            <DocSection title="API REST et CLI">
                <DocParagraph>
                    Intégrez Comptasse à votre écosystème grâce à une API REST complète et une interface en ligne de
                    commande. Les deux outils partagent la même logique métier et les mêmes droits d'accès.
                </DocParagraph>
                <DocList
                    items={[
                        "Authentification par clé API",
                        "Accès complet aux organisations, exercices, écritures et documents",
                        "Documentation des routes intégrée",
                        "CLI disponible sur Linux et macOS pour automatiser les tâches",
                    ]}
                />
                <DocParagraph>
                    <DocLink to="/documentation/guide/référence-api">Consulter la documentation API</DocLink> -{" "}
                    <DocLink to="/documentation/guide/installation">Découvrir la CLI</DocLink>
                </DocParagraph>
            </DocSection>

            <DocSection title="Intégration">
                <DocParagraph>
                    Intégrez facilement l'outil à différentes interfaces et agents IA pour automatiser votre
                    comptabilité.
                </DocParagraph>
                <DocList
                    items={[
                        "Documentation accessible pour les agents (ajouter .md)",
                        "Skills exposés pour les agents compatibles",
                    ]}
                />
            </DocSection>

            <DocSection title="Sécurité et conformité">
                <DocParagraph>
                    Vos données comptables sont protégées par des pratiques de sécurité robustes et le modèle open
                    source.
                </DocParagraph>
                <DocList
                    items={[
                        "Chiffrement des données en transit et au repos",
                        "Contrôle d'accès par organisation et par rôle",
                    ]}
                />
            </DocSection>
        </DocRoot>
    )
}
