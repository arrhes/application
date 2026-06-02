import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function DemarrerCliDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Démarrer"
                description="Mettre en place le CLI Arrhes et effectuer votre première opération en moins de 5 minutes."
            />

            <DocSection title="1. Installer le CLI">
                <DocParagraph>
                    Le CLI est un binaire autonome - aucune installation de Node.js ou de dépendance requise. Collez
                    l'une des commandes suivantes dans votre terminal :
                </DocParagraph>
                <DocCodeBlock>curl -fsSL https://arrhes.com/cli/install.sh | sh</DocCodeBlock>
                <DocParagraph>Sur Windows (PowerShell) :</DocParagraph>
                <DocCodeBlock>irm https://arrhes.com/cli/install.ps1 | iex</DocCodeBlock>
                <DocTip variant="info">
                    Pour les options d'installation avancées (installation manuelle, autres architectures), consultez la{" "}
                    <DocLink to="/documentation/cli/installation">page Installation</DocLink>.
                </DocTip>
            </DocSection>

            <DocSection title="2. Vérifier l'installation">
                <DocCodeBlock>arrhes --version</DocCodeBlock>
            </DocSection>

            <DocSection title="3. Créer une clé API">
                <DocParagraph>
                    Le CLI s'authentifie exclusivement par clé API. Rendez-vous dans le dashboard pour en créer une :
                </DocParagraph>
                <DocParagraph>
                    <strong>Dashboard → Organisation → API → Clés → Nouvelle clé</strong>
                </DocParagraph>
                <DocTip variant="warning">
                    Copiez la clé immédiatement après sa création - elle ne sera plus affichée ensuite.
                </DocTip>
            </DocSection>

            <DocSection title="4. Se connecter">
                <DocCodeBlock>
                    {"arrhes login --api-key <votre-clé> --url https://api.arrhes.com --org <idOrganisation>"}
                </DocCodeBlock>
                <DocParagraph>
                    Le CLI vérifie la clé et enregistre la configuration dans <DocCode>~/.arrhes/config.json</DocCode>.
                    L'identifiant d'organisation est requis - il est utilisé automatiquement pour toutes les commandes.
                </DocParagraph>
            </DocSection>

            <DocSection title="5. Première commande">
                <DocParagraph>Vérifiez que tout fonctionne en listant vos exercices :</DocParagraph>
                <DocCodeBlock>arrhes years list</DocCodeBlock>
                <DocTip variant="info">
                    Toutes les réponses du CLI sont en JSON. Combinez-les avec <DocCode>jq</DocCode> pour filtrer ou
                    formater les résultats.
                </DocTip>
            </DocSection>
        </DocRoot>
    )
}
