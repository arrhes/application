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
                description="Sécuriser l'accès à votre comptabilité selon votre interface"
            />

            <DocSection title="Méthodes d'authentification">
                <DocParagraph>
                    Arrhes utilise un système d'authentification unique par cookie de session pour toutes les interfaces
                    (Dashboard, API et CLI).
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
                                La connexion au dashboard se fait par email et mot de passe. Une fois connecté, un
                                cookie de session sécurisé est déposé dans votre navigateur.
                            </DocParagraph>
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
                                L'API s'authentifie via un cookie de session. Pour utiliser l'API programmatiquement,
                                connectez-vous d'abord avec vos identifiants, puis réutilisez le cookie de session.
                            </DocParagraph>
                            <DocTable
                                headers={[
                                    "En-tête",
                                    "Description",
                                ]}
                                rows={[
                                    [
                                        "Cookie: arrhes_id_user_session=...",
                                        "Cookie de session obtenu après connexion",
                                    ],
                                    [
                                        "X-Organization-Id: <id>",
                                        "ID de l'organisation (optionnel, peut aussi être dans le cookie)",
                                    ],
                                ]}
                            />
                            <DocExample title="Se connecter à l'API">
                                <DocList
                                    items={[
                                        "Appelez POST /v1/auth/sign-in avec email et mot de passe",
                                        "Récupérez le cookie Set-Cookie dans la réponse",
                                        "Utilisez ce cookie pour les requêtes suivantes",
                                    ]}
                                />
                            </DocExample>
                            <DocTip variant="info">
                                Toutes les bibliothèques HTTP (fetch, axios, curl) gèrent automatiquement les cookies.
                            </DocTip>
                        </>
                    }
                    cli={
                        <>
                            <DocParagraph>
                                Le CLI s'authentifie via un cookie de session. Connectez-vous avec vos identifiants
                                pour commencer à utiliser le CLI.
                            </DocParagraph>
                            <DocParagraph>Connectez le CLI :</DocParagraph>
                            <DocCodeBlock>arrhes login</DocCodeBlock>
                            <DocParagraph>
                                La configuration est enregistrée dans <DocCode>~/.arrhes/config.json</DocCode>. Vérifiez
                                la connexion avec :
                            </DocParagraph>
                            <DocCodeBlock>arrhes whoami</DocCodeBlock>
                            <DocTip variant="info">
                                L'option <DocCode>--url</DocCode> est facultative. Par défaut, le CLI se connecte à{" "}
                                <DocCode>https://api.arrhes.com</DocCode>. Pour un auto-hébergement, passez l'URL de
                                votre instance.
                            </DocTip>
                            <DocParagraph>Pour effacer les identifiants stockés localement :</DocParagraph>
                            <DocCodeBlock>arrhes logout</DocCodeBlock>
                        </>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
