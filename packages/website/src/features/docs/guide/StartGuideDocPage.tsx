import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTip } from "../../../components/document/DocTip.js"
import { LinkButton } from "../../../components/LinkButton.js"
import { useSiteOrigin } from "../../../utilities/useSiteOrigin.js"

export function StartGuideDocPage() {
    const origin = useSiteOrigin()
    return (
        <DocRoot>
            <DocHeader
                title="Démarrer"
                description="Trois étapes pour installer Comptasse, vous authentifier et commencer à l'utiliser"
            />

            <DocSection title="1. Installer Comptasse">
                <DocParagraph>
                    Comptasse s'installe en un seul conteneur Docker. Vous pouvez choisir l'une des trois méthodes
                    d'installation selon votre environnement.
                </DocParagraph>

                <DocExample title="Installation automatique">
                    <DocCodeBlock>{`curl -fsSL ${origin}/install.sh | sh`}</DocCodeBlock>
                </DocExample>

                <DocParagraph>
                    Pour les autres méthodes (installation manuelle avec Docker, Compose avec services intégrés,
                    variables d'environnement) :{" "}
                    <LinkButton to="/documentation/guide/installation">Voir la page Installation</LinkButton>
                </DocParagraph>
            </DocSection>

            <DocSection title="2. S'authentifier">
                <DocParagraph>
                    Une fois Comptasse démarré, ouvrez le dashboard à l'adresse <DocCode>http://localhost:5173</DocCode>{" "}
                    et créez votre compte. Vous pouvez aussi utiliser l'API ou le CLI.
                </DocParagraph>

                <DocList
                    items={[
                        "Dashboard : créez un compte depuis la page d'inscription",
                        "API : utilisez POST /auth/sign-up puis POST /auth/sign-in",
                        "CLI : exécutez comptasse login pour créer un compte ou vous connecter",
                    ]}
                />

                <DocParagraph>
                    Pour les détails de chaque méthode d'authentification :{" "}
                    <LinkButton to="/documentation/guide/authentification">Voir la page Authentification</LinkButton>
                </DocParagraph>

                <DocTip variant="info">
                    Le CLI est un client HTTP autonome. Installez-le avec{" "}
                    <DocCode>{`curl -fsSL ${origin}/cli/install.sh | sh`}</DocCode> ou utilisez-le directement dans le
                    conteneur avec <DocCode>docker exec comptasse comptasse --help</DocCode>.
                </DocTip>
            </DocSection>

            <DocSection title="3. Commencer à utiliser">
                <DocParagraph>
                    Après votre première connexion, suivez ces étapes pour configurer votre environnement et saisir vos
                    premières écritures.
                </DocParagraph>

                <DocExample title="Parcours recommandé">
                    <DocList
                        items={[
                            "Créez votre première organisation",
                            "Créez un exercice comptable",
                            "Vérifiez le plan comptable généré automatiquement",
                            "Créez un journal de banque et un journal d'achats",
                            "Saisissez votre première écriture",
                        ]}
                    />
                </DocExample>
            </DocSection>

            <DocSection title="Besoin d'aide ?">
                <DocParagraph>
                    Si vous débutez en comptabilité, commencez par le{" "}
                    <DocLink to="/documentation/comptabilité">cours de comptabilité</DocLink>. Vous pouvez aussi
                    consulter la page <DocLink to="/documentation/support">Support</DocLink> pour poser une question.
                </DocParagraph>
            </DocSection>
        </DocRoot>
    )
}
