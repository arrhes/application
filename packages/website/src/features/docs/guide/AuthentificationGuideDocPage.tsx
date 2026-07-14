import {
    createOneApiKeyRouteDefinition,
    deleteOneApiKeyRouteDefinition,
    readAllApiKeysRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocImplementationTabs } from "../../../components/document/DocImplementationTabs.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.js"
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
                    Arrhes propose plusieurs méthodes d'authentification selon l'interface utilisée. Le dashboard repose
                    sur un cookie de session, tandis que l'API et le CLI utilisent des clés API pour les intégrations
                    programmatiques.
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
                            "Cookie de session ou clé API (Bearer)",
                            "Intégration programmatique",
                        ],
                        [
                            "CLI",
                            "Clé API",
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
                                L'API supporte deux méthodes d'authentification : le cookie de session (pour un usage
                                depuis l'interface web) et la clé API Bearer (pour les intégrations).
                            </DocParagraph>
                            <DocTable
                                headers={[
                                    "Méthode",
                                    "En-tête",
                                    "Organisation",
                                ]}
                                rows={[
                                    [
                                        "Cookie de session",
                                        "Cookie: arrhes_id_user_session=...",
                                        "Via X-Organization-Id ou cookie arrhes_id_organization",
                                    ],
                                    [
                                        "Clé API",
                                        "Authorization: Bearer <clé>",
                                        "Déterminée automatiquement par la clé",
                                    ],
                                ]}
                            />
                            <DocParagraph>
                                Les clés API sont liées à une organisation. Elles permettent un accès programmatique
                                sans passer par le cookie de session.
                            </DocParagraph>
                            <DocRouteRequest
                                routeDefinition={createOneApiKeyRouteDefinition}
                                description="Créer une nouvelle clé API. Retourne l'objet clé avec le champ rawKey."
                            />
                            <DocRouteRequest routeDefinition={readAllApiKeysRouteDefinition} />
                            <DocRouteRequest routeDefinition={deleteOneApiKeyRouteDefinition} />
                            <DocTip variant="warning">
                                La clé brute (<DocCode>rawKey</DocCode>) n'est retournée qu'au moment de la création.
                                Conservez-la précieusement, elle ne pourra pas être récupérée ultérieurement.
                            </DocTip>
                        </>
                    }
                    cli={
                        <>
                            <DocParagraph>
                                Le CLI s'authentifie exclusivement par clé API. Vous devez d'abord créer une clé depuis
                                le dashboard, puis l'utiliser avec la commande <DocCode>arrhes login</DocCode>.
                            </DocParagraph>
                            <DocExample title="Créer une clé API">
                                <DocList
                                    items={[
                                        "Ouvrez le dashboard de votre organisation.",
                                        "Allez dans Organisation → API → Clés.",
                                        "Cliquez sur « Nouvelle clé ».",
                                        "Donnez un nom à la clé et copiez la valeur affichée.",
                                    ]}
                                />
                            </DocExample>
                            <DocParagraph>Connectez le CLI :</DocParagraph>
                            <DocCodeBlock>{"arrhes login --api-key <votre-clé> --org <idOrganisation>"}</DocCodeBlock>
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
