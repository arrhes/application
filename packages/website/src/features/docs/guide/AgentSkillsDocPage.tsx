import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocSection } from "../../../components/document/DocSection.js"

const paperasseRepo = "https://github.com/romainsimon/paperasse"
const apiKeyDocLink = "/documentation/guide/référence-api"

export function AgentSkillsDocPage() {
    return (
        <>
            <DocHeader
                title="Skills pour agent IA"
                description="Configurez votre agent IA avec des skills spécialisés pour interagir avec Arrhes."
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Arrhes expose l'ensemble de ses fonctionnalités via une API REST complète, ce qui permet à un agent
                    IA externe d'interagir avec vos données comptables. En combinant un modèle de langage avec les
                    skills appropriés, votre agent peut consulter des écritures, créer des entrées, générer des
                    documents, et bien plus encore.
                </DocParagraph>
            </DocSection>

            <DocSection title="Authentification">
                <DocParagraph>
                    Pour qu'un agent externe puisse interagir avec Arrhes, vous devez lui fournir une clé API.
                    Rendez-vous dans votre profil → API pour créer une clé personnelle. L'agent utilisera cette clé dans
                    l'en-tête <DocCode>{"Authorization: Bearer <clé>"}</DocCode> de chaque requête.
                </DocParagraph>
            </DocSection>

            <DocSection title="Paperasse : skills pour agents IA">
                <DocParagraph>
                    <DocLink to={paperasseRepo}>Paperasse</DocLink> est une collection de skills Markdown pour agents IA
                    spécialisés dans la bureaucratie française : comptabilité, fiscalité, notariat, audit. Les skills
                    sont compatibles avec Claude Code, Cursor, Windsurf, Cline, Aider et tous les outils capables de
                    lire des fichiers Markdown.
                </DocParagraph>
                <DocParagraph>
                    Paperasse inclut un skill <DocCode>{"comptable"}</DocCode> qui couvre le PCG (800+ comptes), la TVA,
                    l'IS, la clôture annuelle en 12 étapes, le FEC, la liasse fiscale, le rapprochement bancaire, et la
                    facturation électronique. Il peut être utilisé conjointement avec l'API Arrhes pour interagir
                    directement avec vos données comptables.
                </DocParagraph>
                <DocParagraph>
                    Consultez les skills Paperasse sur{" "}
                    <DocLink to={paperasseRepo}>github.com/romainsimon/paperasse</DocLink> ainsi que le registre{" "}
                    <DocLink to="https://agentskill.sh/skillsets/paperasse">agentskill.sh/skillsets/paperasse</DocLink>.
                </DocParagraph>
            </DocSection>

            <DocSection title="Prompt système (.md)">
                <DocParagraph>
                    Voici un exemple de prompt système que vous pouvez donner à votre agent. Enregistrez-le dans votre
                    répertoire de skills (par exemple <DocCode>{"~/.claude/skills/arrhes.md"}</DocCode> pour Claude
                    Code) :
                </DocParagraph>
                <DocCodeBlock>
                    {`# Arrhes - Assistant comptable

Tu es un assistant expert en comptabilité française intégré à l'API d'Arrhes.
Tu aides les utilisateurs à gérer leur comptabilité en partie double.

## Règles générales
- Réponds toujours en français, de manière concise et précise.
- Utilise le Plan Comptable Général (PCG) français.
- Précise toujours le numéro de compte et son libellé.
- Ne modifie jamais les données sans confirmation explicite.

## Authentification
- Clé API : Authorization: Bearer <ta_clé>
- Organisation : header X-Arrhes-Organization-ID ou cookie

## Opérations disponibles
### Consultation
- Consulter le plan comptable, les journaux, les écritures
- Lire les documents de synthèse (balance, grand livre, bilan, résultat)
- Rechercher des pièces justificatives

### Création
- Créer des écritures comptables avec lignes débit/crédit
- Créer des comptes, journaux, catégories
- Ajouter des fichiers

### Analyse
- Trier, filtrer, agréger des données
- Détecter les anomalies
- Générer des rapports`}
                </DocCodeBlock>
                <DocParagraph>
                    Placez ce fichier dans le répertoire de skills de votre agent préféré (voir la documentation de
                    Paperasse pour les chemins exacts selon la plateforme).
                </DocParagraph>
            </DocSection>

            <DocSection title="Outils utiles">
                <DocParagraph>
                    Une fois le skill installé, votre agent peut utiliser l'API d'Arrhes pour effectuer des opérations
                    avancées. Consultez la page{" "}
                    <DocLink to="/documentation/guide/agent/outils">outils et exemples de code</DocLink> pour des
                    exemples concrets en TypeScript et Python.
                </DocParagraph>
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
