import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function AuthenticationCliDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Authentification"
                description="Connecter le CLI à votre compte via une clé API"
            />

            <DocSection title="Créer une clé API">
                <DocParagraph>
                    Le CLI s'authentifie exclusivement par clé API. Pour en créer une, rendez-vous dans le dashboard :
                </DocParagraph>
                <DocParagraph>
                    <strong>Dashboard → Organisation → API → Clés → Nouvelle clé</strong>
                </DocParagraph>
                <DocTip variant="warning">
                    Copiez la clé immédiatement après sa création — elle ne sera plus affichée ensuite.
                </DocTip>
            </DocSection>

            <DocSection title="Se connecter">
                <DocExample title="Connexion">
                    <DocCodeBlock>{"arrhes login --api-key <votre-clé> --org <idOrganisation>"}</DocCodeBlock>
                </DocExample>
                <DocExample title="Connexion (auto-hébergé)">
                    <DocCodeBlock>
                        {"arrhes login --api-key <votre-clé> --org <idOrganisation> --url https://api.mondomaine.com"}
                    </DocCodeBlock>
                </DocExample>
                <DocParagraph>
                    Le CLI vérifie la clé auprès de l'API, puis enregistre la configuration dans{"  "}
                    <DocCode>~/.arrhes/config.json</DocCode>.
                </DocParagraph>
                <DocParagraph>
                    L'identifiant d'organisation (<DocCode>--org</DocCode>) est requis — il est automatiquement injecté
                    dans toutes les commandes.
                </DocParagraph>
                <DocTip variant="info">
                    L'option <DocCode>--url</DocCode> est facultative. Par défaut, le CLI se connecte à{" "}
                    <DocCode>https://api.arrhes.com</DocCode>. Si vous hébergez l'API vous-même, passez l'URL de votre
                    instance — elle sera sauvegardée dans <DocCode>~/.arrhes/config.json</DocCode> et réutilisée pour
                    toutes les commandes suivantes.
                </DocTip>
            </DocSection>

            <DocSection title="Vérifier la connexion">
                <DocCodeBlock>arrhes whoami</DocCodeBlock>
            </DocSection>

            <DocSection title="Se déconnecter">
                <DocParagraph>Pour effacer les identifiants stockés localement :</DocParagraph>
                <DocCodeBlock>arrhes logout</DocCodeBlock>
            </DocSection>

            <DocSection title="Fichier de configuration">
                <DocParagraph>
                    Les identifiants sont stockés en clair dans <DocCode>~/.arrhes/config.json</DocCode>. Vous pouvez
                    éditer ce fichier directement si nécessaire.
                </DocParagraph>
                <DocTip variant="info">
                    Pour utiliser plusieurs comptes ou environnements, il suffit de relancer{",  "}
                    <DocCode>arrhes login</DocCode> avec une autre clé — le fichier est écrasé.
                </DocTip>
                <DocLink to="/documentation/api/authentification">
                    En savoir plus sur l'authentification par clé API
                </DocLink>
            </DocSection>
        </DocRoot>
    )
}
