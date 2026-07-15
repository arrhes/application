import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocSection } from "../../../components/document/DocSection.js"

const apiKeyDocLink = "/documentation/guide/référence-api"

export function AgentSkillGuideDocPage() {
    return (
        <>
            <DocHeader
                title="Utiliser Arrhes avec un agent IA externe"
                description="Configurez votre propre agent IA pour interagir avec Arrhes via l'API REST et le CLI."
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Arrhes expose l'ensemble de ses fonctionnalités via une API REST complète et une interface en ligne
                    de commande. Cela permet à un agent IA externe (Mistral, OpenAI, Claude, Ollama, etc.) d'interagir
                    avec vos données comptables : consulter des écritures, créer des entrées, générer des documents, et
                    bien plus encore.
                </DocParagraph>
            </DocSection>

            <DocSection title="Authentification">
                <DocParagraph>
                    Pour qu'un agent externe puisse interagir avec Arrhes, vous devez lui fournir une clé API.
                    Rendez-vous dans votre profil → API pour créer une clé personnelle. L'agent utilisera cette clé dans
                    l'en-tête <DocCode>{"Authorization: Bearer <clé>"}</DocCode> de chaque requête.
                </DocParagraph>
            </DocSection>

            <DocSection title="Prompt système">
                <DocParagraph>
                    Voici un prompt système que vous pouvez donner à votre agent pour le configurer :
                </DocParagraph>
                <DocCodeBlock>
                    {`Tu es un assistant expert en comptabilité française intégré à Arrhes. Tu aides les utilisateurs à gérer leur comptabilité en partie double.

## Règles générales
- Réponds toujours en français, de manière concise et précise.
- Utilise le plan comptable général (PCG) français.
- Précise toujours le numéro de compte et son libellé quand tu cites un compte.
- Ne modifie jamais les données sans confirmation explicite.
- Vérifie les informations avant d'agir.

## API Arrhes
- Tu interagis avec Arrhes via son API REST.
- L'authentification se fait par clé API (Bearer token).
- L'organisation est identifiée par son ID.
- Les exercices sont identifiés par leur ID.
- Toutes les dates sont au format ISO 8601.

## Opérations disponibles

### Consultation
- Consulter le plan comptable, les journaux, les écritures
- Lire les documents de synthèse : balance, grand livre, bilan, compte de résultat
- Rechercher des pièces justificatives

### Création
- Créer des écritures comptables (avec lignes de débit/crédit)
- Créer des comptes, journaux, catégories
- Ajouter des fichiers et documents

### Analyse
- Trier, filtrer et agréger des données comptables
- Analyser les tendances et détecter les anomalies
- Générer des rapports personnalisés`}
                </DocCodeBlock>
            </DocSection>

            <DocSection title="Exemples d'outils utiles">
                <DocParagraph>Voici quelques opérations particulièrement utiles pour un agent IA :</DocParagraph>

                <DocSection title="Tri et filtrage de données">
                    <DocParagraph>
                        Après avoir récupéré une liste d'écritures ou de comptes, vous pouvez utiliser l'outil{" "}
                        <DocCode>{"process_array"}</DocCode> pour trier, filtrer, compter ou agréger les résultats
                        :
                    </DocParagraph>
                    <DocList
                        items={[
                            "Trier les écritures par date ou par montant",
                            "Filtrer les comptes dont le solde dépasse un seuil",
                            "Compter le nombre d'écritures dans une période",
                            "Additionner les montants d'un journal spécifique",
                            "Trouver les valeurs uniques dans une colonne",
                        ]}
                    />
                </DocSection>

                <DocSection title="Recherche documentaire">
                    <DocParagraph>
                        L'outil de recherche documentaire permet de trouver des informations dans la documentation
                        d'Arrhes, le glossaire comptable et le plan comptable général :
                    </DocParagraph>
                    <DocList
                        items={[
                            "Rechercher la définition d'un terme comptable",
                            "Trouver les règles d'un compte spécifique",
                            "Consulter les scénarios comptables types",
                        ]}
                    />
                </DocSection>

                <DocSection title="Extraction de texte (OCR)">
                    <DocParagraph>
                        Vous pouvez utiliser l'OCR d'Arrhes pour extraire le texte de fichiers PDF ou d'images :
                    </DocParagraph>
                    <DocList
                        items={[
                            "OCR par fichier : traiter un fichier existant",
                            "OCR à l'upload : activer l'option lors de l'ajout d'un fichier",
                            "L'OCR produit un fichier Markdown stocké dans le même dossier",
                        ]}
                    />
                </DocSection>

                <DocSection title="Génération d'écritures types">
                    <DocParagraph>
                        Certaines écritures comptables suivent des modèles récurrents. Vous pouvez utiliser les
                        templates d'écritures pour générer automatiquement des écritures standardisées :
                    </DocParagraph>
                    <DocList
                        items={[
                            "Amortissements linéaires ou dégressifs",
                            "Clôture d'exercice",
                            "Reports à nouveau",
                            "Régularisations de fin d'exercice",
                        ]}
                    />
                </DocSection>
            </DocSection>

            <DocSection title="Bonnes pratiques">
                <DocParagraph>Pour une expérience optimale avec votre agent IA :</DocParagraph>
                <DocList
                    items={[
                        "Limitez chaque requête à une opération simple plutôt qu'une série complexe",
                        "Utilisez la pagination pour les listes volumineuses (limite de 100 résultats par page)",
                        "Vérifiez les résultats avant d'exécuter des opérations destructrices",
                        "Utilisez l'outil de recherche documentaire pour trouver rapidement l'information",
                        "Stockez les IDs des organisations, exercices et autres ressources pour les réutiliser",
                    ]}
                />
            </DocSection>

            <DocSection title="Référence">
                <DocParagraph>
                    Consultez la <DocLink to={apiKeyDocLink}>référence API complète</DocLink> pour la liste exhaustive
                    des endpoints disponibles et leurs paramètres.
                </DocParagraph>
            </DocSection>
        </>
    )
}
