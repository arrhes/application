import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocImplementationTabs } from "../../../components/document/DocImplementationTabs.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTable } from "../../../components/document/DocTable.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function AuthentificationGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Authentification"
                description="Créer un compte et se connecter selon votre interface"
            />

            <DocSection title="Méthodes d'authentification">
                <DocParagraph>
                    Comptasse utilise un système d'authentification unique par email et mot de passe pour toutes les
                    interfaces (Dashboard, API et CLI). Une session est créée sous forme de cookie sécurisé après
                    connexion.
                </DocParagraph>
                <DocTable
                    headers={[
                        "Interface",
                        "Méthode",
                        "Cas d'usage",
                    ]}
                    rows={[
                        [
                            "Dashboard",
                            "Cookie de session",
                            "Utilisation via l'interface web",
                        ],
                        [
                            "API",
                            "Cookie de session",
                            "Intégration programmatique",
                        ],
                        [
                            "CLI",
                            "Cookie de session",
                            "Scripts et automatisation",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="Implémentation">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocParagraph>
                                La connexion au dashboard se fait par email et mot de passe. Vous pouvez créer un compte
                                directement depuis l'interface.
                            </DocParagraph>

                            <DocExample title="Créer un compte">
                                <DocList
                                    items={[
                                        "Rendez-vous sur la page d'inscription.",
                                        "Saisissez votre adresse email.",
                                        "Choisissez un mot de passe et confirmez-le.",
                                        "Cliquez sur « Créer un compte ».",
                                        "Vous êtes connecté automatiquement.",
                                    ]}
                                />
                            </DocExample>

                            <DocExample title="Se connecter">
                                <DocList
                                    items={[
                                        "Rendez-vous sur la page de connexion.",
                                        "Saisissez votre adresse email et votre mot de passe.",
                                        "Cliquez sur « Se connecter ».",
                                        "Vous êtes redirigé vers le tableau de bord de votre organisation.",
                                    ]}
                                />
                            </DocExample>

                            <DocTip variant="info">
                                Si vous gérez plusieurs organisations, le menu déroulant en haut à gauche permet de
                                changer de contexte sans vous déconnecter.
                            </DocTip>
                        </>
                    }
                    api={
                        <>
                            <DocParagraph>
                                L'API expose deux endpoints publics pour l'authentification :
                                <DocCode>POST /auth/sign-up</DocCode> pour créer un compte et
                                <DocCode>POST /auth/sign-in</DocCode> pour se connecter. Les deux endpoints retournent
                                un cookie de session dans l'en-tête
                                <DocCode>Set-Cookie</DocCode>.
                            </DocParagraph>

                            <DocExample title="Créer un compte">
                                <DocCodeBlock>{`curl -X POST http://localhost:3000/auth/sign-up \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "utilisateur@exemple.com",
    "password": "votre-mot-de-passe",
    "passwordCheck": "votre-mot-de-passe"
  }'`}</DocCodeBlock>
                            </DocExample>

                            <DocExample title="Se connecter">
                                <DocCodeBlock>{`curl -X POST http://localhost:3000/auth/sign-in \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "utilisateur@exemple.com",
    "password": "votre-mot-de-passe"
  }' \\
  -c cookies.txt`}</DocCodeBlock>
                            </DocExample>

                            <DocExample title="Utiliser la session pour les requêtes suivantes">
                                <DocCodeBlock>{`curl http://localhost:3000/organizations/me \\
  -b cookies.txt`}</DocCodeBlock>
                            </DocExample>

                            <DocTable
                                headers={[
                                    "En-tête",
                                    "Description",
                                ]}
                                rows={[
                                    [
                                        "Cookie: comptasse_id_user_session=...",
                                        "Cookie de session obtenu après connexion",
                                    ],
                                    [
                                        "X-Organization-Id: <id>",
                                        "ID de l'organisation (optionnel, peut aussi être dans le cookie)",
                                    ],
                                ]}
                            />

                            <DocTip variant="info">
                                Toutes les bibliothèques HTTP (fetch, axios, curl) gèrent automatiquement les cookies.
                            </DocTip>
                        </>
                    }
                    cli={
                        <>
                            <DocParagraph>
                                Le CLI stocke la session dans <DocCode>~/.comptasse/config.json</DocCode>. La commande{" "}
                                <DocCode>login</DocCode> crée un compte si l'email n'existe pas encore, ou se connecte
                                s'il existe.
                            </DocParagraph>

                            <DocExample title="Créer un compte ou se connecter">
                                <DocCodeBlock>{`comptasse login --url http://localhost:3000
# Saisissez votre email
# Saisissez votre mot de passe
# Confirmez votre mot de passe si c'est une création de compte`}</DocCodeBlock>
                            </DocExample>

                            <DocExample title="Vérifier la connexion">
                                <DocCodeBlock>comptasse whoami</DocCodeBlock>
                            </DocExample>

                            <DocExample title="Se déconnecter">
                                <DocCodeBlock>comptasse logout</DocCodeBlock>
                            </DocExample>

                            <DocTip variant="info">
                                L'option <DocCode>--url</DocCode> est facultative. Par défaut, le CLI se connecte à{" "}
                                <DocCode>https://api.comptasse.com</DocCode>. Pour un auto-hébergement, passez l'URL de
                                votre instance.
                            </DocTip>
                        </>
                    }
                />
            </DocSection>

            <DocSection title="Gestion des sessions">
                <DocList
                    items={[
                        "Une seule session active par navigateur ou par CLI.",
                        "Le cookie de session est signé et stocké de manière sécurisée.",
                        "La déconnexion invalide la session côté serveur.",
                        "En cas de perte de mot de passe, utilisez la fonction de réinitialisation depuis le dashboard.",
                    ]}
                />
            </DocSection>
        </DocRoot>
    )
}
